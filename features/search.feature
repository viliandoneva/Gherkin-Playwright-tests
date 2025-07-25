Feature: Product search

    Scenario: Search for a product
    Given I am on the home page
    When I search for "Tshirt"
    Then I should see at least one search result