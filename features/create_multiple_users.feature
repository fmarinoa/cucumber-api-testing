Feature: POST /user/createWithArray - Create Multiple Users

  @TESTID_003
  Scenario: Successfully create multiple users
    Given I set the context for the test with the file "TESTID_003"
    When I send a POST request to "/user/createWithArray"
    Then the response status code should be 200
    And the response body should be the same as expected

  @TESTID_004
  Scenario: Fail to create multiple users due to invalid data
    Given I set the context for the test with the file "TESTID_004"
    When I send a POST request to "/user/createWithArray"
    Then the response status code should be 500
    And the response body should be the same as expected
