import '../ViewInfo.css'
import React, { Component, useRef, useState } from 'react'
import Survey from '../../abi/Complain.json'
import Web3 from 'web3'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'

import SurveyForm from '../Survey/SurveyForm'

class Enquiry extends React.Component {
  async componentWillMount() {
    console.log(
      'componentWillMount() : component/window gets loaded and calling ',
    )
    await this.loadWeb3()
    await this.loadBlockchainData()
  }

  async loadWeb3() {
    //MetaMask injects a global API into websites visited by its users at window.ethereum
    console.log(
      'loadWeb3 : MetaMask injecting a global API into websites visited by its users at window.ethereum ',
    )
    if (window.ethereum) {
      window.web3 = new Web3(window.ethereum)
      await window.ethereum.enable()
    }
    //(Also available at window.web3.currentProvider for legacy reasons)
    else if (window.web3) {
      window.web3 = new Web3(window.web3.currentProvider)
    } else {
      window.alert(
        'Non-Ethereum browser detected. You should consider trying MetaMask!',
      )
    }
  }

  async loadBlockchainData() {
    console.log(
      'loadBlockchainData() : with the help of metamask calling smart contract methods.',
    )
    const web3 = await window.web3

    // Load account from metamask
    const accounts = await web3.eth.getAccounts()
    console.log('Metamask Account : ', accounts)
    this.setState({ account: accounts[0] })

    // package allows you to interact with an Ethereum node’s network properties. Ganache/Mainet/Testnet
    const networkId = await web3.eth.net.getId()
    console.log('network id :', networkId)
    this.setState({ networkId })
    //Gives smart contract Address & block address of smart contract
    const networkData = await Survey.networks[networkId]
    this.setState({ networkData })
    console.log(
      'network Data -> smart contract Address & block address of smart contract :',
      networkData,
    )
    if (networkData) {
      const survey = new web3.eth.Contract(Survey.abi, networkData.address)
      console.log('enquiry object of smart contract : ', survey)
      this.setState({ survey })
      const surveyCount = await survey.methods.surveyCount().call()
      console.log('toatal no of enquiry available : ', surveyCount)
      this.setState({ surveyCount })
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      survey: null,
      surveyCount: null,
      networkData: null,
    }
  }
  render() {
    const handleSubmit = (event) => {
      event.preventDefault()
      const text1 = event.target.text1.value

      if (this.state.networkData) {
        console.log(
          'enquiry: object of smart contract calling method to upload enquiry',
        )
        window.alert('Confirm the transaction')
        this.state.survey.methods
          .deploySurvey(text1)
          .send({ from: this.state.account })
          .then(function (receipt) {
            console.log(receipt)
            console.log('confirmation : enquiry Uploaded to blockchain')
          })
        this.setState({ loading: false })
      } else {
        window.alert('enquiry contract not deployed to detected network.')
      }
    }
    return (
      <>
        <nav className="navBg navbar navbar-expand-lg navbar-dark">
          <a className="BrandName navbar-brand" href="#">
            <span className="flickPlay">
              <i className=" fas fa-compact-disc"></i> i
            </span>
            VOTE
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-toggle="collapse"
            data-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navElements navbar-nav ml-auto">
              <li className="nav-item">
                <NavLink to="/UserDashBoard" className="nav-link">
                  DashBoard
                </NavLink>
              </li>
              <li className="nav-item">
              <a href="https://vivek2502.github.io/DVoting/">
                      Vote
                  </a>
              </li>
              <li className="nav-item">
                <NavLink to="/SurveyForm" className="nav-link">
                  Survey
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink to="/EnquiryForm" className="nav-link">
                  Enquiry
                </NavLink>
              </li>
            </ul>
          </div>
        </nav>

        <form className="surveyForm" onSubmit={handleSubmit}>
          <h1>Enquiry Form</h1>
          <fieldset>
            <legend>
              <span className="surveyNumber">#</span> Be the hero of this nation
            </legend>

            <label>Write Your Enquiry Here !!!</label>
            <textarea
              className="textArea"
              rows="4"
              cols="50"
              name="text1"
            ></textarea>
          </fieldset>

          <br />
          <button className="surveyButton" type="submit">
            Submit
          </button>
        </form>

        <footer id="footer">
          <p>© Copyright 2020 Flick Play</p>
        </footer>
      </>
    )
  }
}

export default Enquiry
