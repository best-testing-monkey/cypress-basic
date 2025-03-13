# Intro

I've received he request to show some cypress code i wrote as assesment.

Unfortunately, all cypress that i had was written under contract, so not in public domain nor open source.

So this is a short and fairly basic test automation set up and built in 4 hours.(including setup on local machine)

## Chosen target: automationexercise.com

automationexercise.com is a test site explicitly for test automation exersizes.

We have no access to database, code or testdata, so we'll need to work within these limits.

## Notes and Limits:
* Used robot pattern/principle as much as possible: For one method for each action named from perspective of the users' journey
* Test data will be (re-)created before each test
* Not all elements have ID's or test identifiers and some have to be selected using the element text. 
  (!) This is BRITTLE!! In practice i would insist these identifiers be added or would add them myself.
  
  
 # Todo
 
 Add my own plugin https://github.com/best-testing-monkey/cypress-geometry-snapshot (after getting that up to current standards: its been three years since updating)