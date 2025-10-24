Feature: GET /user/login - Log in a user

  @TESTID_005
  Scenario: Successfully log in a user
    Given I set the context for the test with the file "TESTID_005"
    When I send a GET request to "/user/login"
    Then the response status code should be 200
    And the response body should be the same as expected
    And the response headers should be the same as expected
