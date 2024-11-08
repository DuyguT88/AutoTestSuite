Feature: Pet Service API operations

  Scenario Outline: Adding a new pet
    Given I have valid pet data with name <name>, status <status>, and category <category>
    When I add the pet to the store
    Then I should receive a confirmation with the new pet details
    And I can get the pet with name <name>, status <status>, and category <category>

    Examples:
      | name   | status      | category   |
      | "Max"  | "available" | "Dogs"     |
      | "Bella"| "sold"      | "Cats"     |

  Scenario: Deleting an existing pet
    Given I have an existing pet ID
    When I delete the pet from the store
    Then I should receive a confirmation of the deletion
    And I cannot get the deleted pet

  Scenario Outline: Updating an existing pet
    Given I have an existing pet ID
    When I update the pet with name <name>, status <status>, and category <category>
    Then I should receive a confirmation with the updated pet details
    And I can get the pet with name <name>, status <status>, and category <category>

    Examples:
      | id | name     | status      | category   |
      | 10 | "Buddy"  | "available" | "Dogs"     |
      | 15 | "Fluffy" | "sold"      | "Cats"     |