Feature: Delete a pet from the store

  Scenario: Deleting an existing pet
    Given I have an existing pet ID
    When I delete the pet from the store
    Then I should receive a confirmation of the deletion
    And I cannot get the deleted pet