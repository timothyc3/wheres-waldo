## Project Name & Pitch
An application used to play 'Find Waldo', which involves the user finding the characters in the Waldo franchise for the pictures selected in the game.

## Project Status
1.0 version: Complete, the core game now works as intended

## Reflection
The context of this project was to learn more about full stack development, as this is the first implementation of a backend in my webpages since learning about them. I wanted to create using the backend system a way to validate the user's input such that they cannot easily cheat by editing the system. I also wanted to give a way for the user to record their high scores and view them to compare scores to other user that are using this page.

This was a great learning experience as it provided the opportunity for me to learn how to connect the front end to back end. As I used firebase as my backend, the emphasis for this project is the interconnection between the two, not the actual setting up of the backend itself. As react itself is still relatively new to me having only used it for two months, I am still familiarizing myself with the language, using this as an opportunity to practise using functional components and hooks.

The biggest challenge of this project is definitely the validation of user actions and being able to logically determine how to log the actions themselves to achieve that. In the end, the method I decided to go with is the coordinates on the page itself that the user clicked on and aligning it with the position of the game image in order to know where the user clicked. Although that would mean other elements such as the navigation bar would need to be accounted for, this solution served my purpose sufficently.
