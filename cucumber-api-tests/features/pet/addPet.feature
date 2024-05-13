Feature: Add a new pet to the store

  Scenario Outline: Adding a new pet
    Given I have valid pet data with name <name>, status <status>, and category <category>
    When I add the pet to the store
    Then I should receive a confirmation with the new pet details
    And I can get the added new pet

    Examples:
      | name   | status      | category   |
      | "Max"  | "available" | "Dogs"     |
      | "Bella"| "sold"      | "Cats"     |