import React, { Component, useRef, useState } from 'react'
import './SurveyForm.css'
import '../ViewInfo.css'
import Survey from '../../abi/Survey.json'
import Web3 from 'web3'
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'

class SurveyForm extends React.Component {
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
      console.log('survey object of smart contract : ', survey)
      this.setState({ survey })
      const surveyCount = await survey.methods.surveyCount().call()
      console.log('toatal no of survey available : ', surveyCount)
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
      const text2 = event.target.text2.value
      const text3 = event.target.text3.value
      const text4 = event.target.text4.value
      const text5 = event.target.text5.value
      const text6 = event.target.text6.value
      console.log(text6)
      if (this.state.networkData) {
        console.log(
          'Survey: object of smart contract calling uploadVideo method to upload Survey',
        )
        window.alert('Confirm the transaction')
        this.state.survey.methods
          .deploySurvey(text1, text2, text3, text4, text5, text6)
          .send({ from: this.state.account })
          .then(function (receipt) {
            console.log(receipt)
            console.log('confirmation Survey Uploaded to blockchain')
          })
        this.setState({ loading: false })
      } else {
        window.alert('survey contract not deployed to detected network.')
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
          <h1>Survey Form</h1>
          <fieldset>
            <legend>
              <span className="surveyNumber">#</span> Be the hero of this nation
            </legend>

            <label>What qualities are you looking in your leader ?</label>
            <input type="text" name="text1" />

            <label>Do you think it's worth voting ? </label>
            <input type="text" name="text2" />

            <label>What change are you seeking in medication?</label>
            <input type="text" name="text3" />

            <label>Your Comment on development !</label>
            <input type="text" name="text4" />

            <label>Does more transportation needed in Your area ?</label>
            <input type="text" name="text5" />

            <label>Any other personal opinion ?</label>
            <input type="text" name="text6" />
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

export default SurveyForm
