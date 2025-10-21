Feature: POST /user - Create User

  @TESTID_001
  Scenario: Successfully create a new user
    Given I set the context for the test with the file "TESTID_001"
    When I send a "POST" request to "/user"
    Then the response status code should be 200
    And the response body should be the same as expected

  @TESTID_002
  Scenario: Fail to create a new user due to invalid data
    Given I set the context for the test with the file "TESTID_002"
    When I send a "POST" request to "/user"
    Then the response status code should be 500
    And the response body should be the same as expected