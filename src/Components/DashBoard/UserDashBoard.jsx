import '../ViewInfo.css'
import React, { Component, useRef, useState } from 'react'
import Survey from '../../abi/Survey.json'
import Complain from '../../abi/Complain.json'
import Web3 from 'web3'

import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from 'react-router-dom'
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit'

class UserDashBoard extends React.Component {
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
    const networkDataSurvey = await Survey.networks[networkId]
    const networkDataComplain = await Complain.networks[networkId]
    this.setState({ networkDataSurvey })
    this.setState({ networkDataComplain })
    console.log(
      'networkDataSurvey Data -> smart contract Address & block address of smart contract :',
      networkDataSurvey,
    )
    console.log(
      'networkDataComplain Data -> smart contract Address & block address of smart contract :',
      networkDataComplain,
    )
    if (networkDataSurvey) {
      const survey = new web3.eth.Contract(
        Survey.abi,
        networkDataSurvey.address,
      )
      console.log('survey object of smart contract : ', survey)
      this.setState({ survey })
      const surveyCount = await survey.methods.surveyCount().call()
      console.log('toatal no of survey available : ', surveyCount)
      this.setState({ surveyCount })

      for (var i = surveyCount; i >= 1; i--) {
        const ecom = await survey.methods.surveys(i).call()
        // console.log('ecom: ', ecom)
        this.setState({
          Text1: [...this.state.Text1, ecom.survey1],
        })
        this.setState({
          Text2: [...this.state.Text2, ecom.survey2],
        })
        this.setState({
          Text3: [...this.state.Text3, ecom.survey3],
        })
        this.setState({
          Text4: [...this.state.Text4, ecom.survey4],
        })
        this.setState({
          Text5: [...this.state.Text5, ecom.survey5],
        })
        this.setState({
          Text6: [...this.state.Text6, ecom.survey6],
        })
      }
    }
    if (networkDataComplain) {
      const complain = new web3.eth.Contract(
        Complain.abi,
        networkDataComplain.address,
      )
      console.log('complain object of smart contract : ', complain)
      this.setState({ complain })
      const complainCount = await complain.methods.surveyCount().call()
      console.log('toatal no of complain available : ', complainCount)
      this.setState({ complainCount })
      for (var i = complainCount; i >= 1; i--) {
        const ecom = await complain.methods.surveys(i).call()
        console.log(ecom)
        this.setState({
          Enquiry: [...this.state.Enquiry, ecom.survey1],
        })
      }
    }
  }

  constructor(props) {
    super(props)
    this.state = {
      account: '',
      survey: null,
      complain: null,
      surveyCount: null,
      complainCount: null,
      networkDataSurvey: null,
      networkDataComplain: null,
      Enquiry: [],
      Text1: [],
      Text2: [],
      Text3: [],
      Text4: [],
      Text5: [],
      Text6: [],
    }
  }
  render() {
    const handleSubmit = (event) => {
      event.preventDefault()

      if (this.state.networkData) {
      } else {
        window.alert('survey contract not deployed to detected network.')
      }
    }
    return (
      <div className="UserDashBoard_Container">
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

        {/* votings */}
        <div className="tableSection_Container">
          <div className="tableHeading">Vote Records</div>

          <MDBTable className="tableStart">
            <MDBTableHead className="tableHeads">
              <tr style={{ textAlign: 'center' }}>
                <th scope="col">#</th>
                <th scope="col">Date</th>
                <th scope="col">Party</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              <tr style={{ textAlign: 'center' }}>
                <td className="tableTextWhite">1</td>
                <td className="tableTextWhite">Saloni</td>
                <td className="tableTextWhite">BJP</td>
              </tr>
            </MDBTableBody>
          </MDBTable>

          {/* Survey */}
          <div className="tableHeading">Survey Records</div>

          <MDBTable className="tableStart">
            <MDBTableHead className="tableHeads">
              <tr style={{ textAlign: 'center' }}>
                <th scope="col">#</th>
                <th scope="col">
                  What qualities are you looking in your leader ?
                </th>
                <th scope="col">Do you think it's worth voting ?</th>
                <th scope="col">What change are you seeking in medication?</th>
                <th scope="col">Your Comment on development !</th>
                <th scope="col">
                  Does more transportation needed in Your area ?
                </th>
                <th scope="col">Any other personal opinion ?</th>
              </tr>
            </MDBTableHead>
            {Object.keys(this.state.Text1).map((title, i) => (
              <MDBTableBody>
                <tr style={{ textAlign: 'center' }}>
                  <td className="tableTextWhite">{i + 1}</td>
                  <td className="tableTextWhite">{this.state.Text1[i]}</td>
                  <td className="tableTextWhite">{this.state.Text2[i]}</td>
                  <td className="tableTextWhite">{this.state.Text3[i]}</td>
                  <td className="tableTextWhite">{this.state.Text4[i]}</td>
                  <td className="tableTextWhite">{this.state.Text5[i]}</td>
                  <td className="tableTextWhite">{this.state.Text6[i]}</td>
                </tr>
              </MDBTableBody>
            ))}
          </MDBTable>

          {/* Enquiry */}
          <div className="tableHeading">Enquiry Records</div>

          <MDBTable className="tableStart">
            <MDBTableHead className="tableHeads">
              <tr style={{ textAlign: 'center' }}>
                <th scope="col">#</th>
                <th scope="col">Enquiry</th>
              </tr>
            </MDBTableHead>
            {Object.keys(this.state.Enquiry).map((title, i) => (
              <MDBTableBody>
                <tr style={{ textAlign: 'center' }}>
                  <td className="tableTextWhite">{i + 1}</td>
                  <td className="tableTextWhite">{this.state.Enquiry[i]}</td>
                </tr>
              </MDBTableBody>
            ))}
          </MDBTable>
        </div>

        <footer id="footer">
          <p>© Copyright 2020 Flick Play</p>
        </footer>
      </div>
    )
  }
}

export default UserDashBoard
