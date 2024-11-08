Feature: User Service API operations

  Scenario: Creating a new user
    Given I have user data with username "john_doe", first name "John", last name "Doe"
    When I create the user
    Then I should receive a 200 status code
    And the user data should include username "john_doe" and email matching "john_doe.*@example.com"

  Scenario: Updating the user's email
    Given I have user data with username "john_doe", first name "John", last name "Doe"
    When I create the user
    And I update the user with new email "john_doe_new@example.com"
    Then I should receive a 200 status code
    And the user data should include username "john_doe" and email "john_doe_new@example.com"

  Scenario: Retrieving the user details
    Given I have user data with username "john_doe", first name "John", last name "Doe"
    When I create the user
    And I retrieve the user details
    Then I should receive a 200 status code
    And the user data should include username "john_doe" and email matching "john_doe.*@example.com"

  Scenario: Deleting the user
    Given I have user data with username "john_doe", first name "John", last name "Doe"
    When I create the user
    And I delete the user
    Then I should receive a 200 status code
    And I should not be able to find the user
