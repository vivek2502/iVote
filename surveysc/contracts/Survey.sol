// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Survey {
  uint public surveyCount = 0;
  string public name = "Survey";
  mapping(uint => AddSurvey) public surveys;
  uint lastUpdated;
  

  struct AddSurvey {
    uint id;
    string survey1;
    string survey2;
    string survey3;
    string survey4;
    string survey5;
    string survey6;
    address author;
  }

  event SurveyDeployed(
    uint id,
    string survey1,
    string survey2,
    string survey3,
    string survey4,
    string survey5,
    string survey6,
    address author
    
  );

  function deploySurvey(string memory _survey1, string memory _survey2,string memory _survey3, string memory _survey4, string memory _survey5, string memory _survey6) public {
    
    require(bytes(_survey1).length > 0);
    require(bytes(_survey2).length > 0);
    require(bytes(_survey3).length > 0);
    require(bytes(_survey4).length > 0);
    require(bytes(_survey5).length > 0);
    require(bytes(_survey6).length > 0);
    require(msg.sender!=address(0));
        
    // Increment product count
    surveyCount ++;
    // Add product to the contract
    surveys[surveyCount] = AddSurvey(surveyCount, _survey1, _survey2, _survey3, _survey4, _survey5, _survey6, msg.sender);
    // Trigger an event
    emit SurveyDeployed(surveyCount, _survey1, _survey2, _survey3, _survey4, _survey5, _survey6, msg.sender);
  }
}
