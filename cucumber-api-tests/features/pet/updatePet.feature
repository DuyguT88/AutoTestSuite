Feature: Update an existing pet in the store

  Scenario Outline: Updating an existing pet
    Given I have an existing pet with ID <id>
    When I update the pet with name <name>, status <status>, and category <category>
    Then I should receive a confirmation with the updated pet details

    Examples:
      | id | name     | status      | category   |
      | 10 | "Buddy"  | "available" | "Dogs"     |
      | 15 | "Fluffy" | "sold"      | "Cats"     |