// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.9.0;

contract Complain {
  uint public surveyCount = 0;
  string public name = "Survey";
  mapping(uint => AddSurvey) public surveys;
  uint lastUpdated;
  

  struct AddSurvey {
    uint id;
    string survey1;
    
    address author;
  }

  event SurveyDeployed(
    uint id,
    string survey1,
    
    address author
    
  );

  function deploySurvey(string memory _survey1) public {
    
    require(bytes(_survey1).length > 0);
    
    require(msg.sender!=address(0));
        
    // Increment product count
    surveyCount ++;
    // Add product to the contract
    surveys[surveyCount] = AddSurvey(surveyCount, _survey1, msg.sender);
    // Trigger an event
    emit SurveyDeployed(surveyCount, _survey1, msg.sender);
  }
}
