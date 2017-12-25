# RENGE

A small framework for making discord bots

![https://i.pinimg.com/736x/a9/00/69/a9006991fbf35bfa83c1a62664cb34a7--non-non-biyori-sticker.jpg](https://i.pinimg.com/736x/a9/00/69/a9006991fbf35bfa83c1a62664cb34a7--non-non-biyori-sticker.jpg)

* TODO Write this readme
  - Philosophy
  - Usage 'Command' class
  - Usage (helpers)
  - Usage (scheduled jobs/async)
* TODO Implement scheduling and job deferral
* TODO Implement recursive commands (sub-commands)
* TODO Add some example commands
* TODO subcmd shouldn't have to peel its own command off token list.
* TODO Add pre-dispatch hook


## Using the Message and Command classes

* Command class can be used by itself to encapsulate business logic for a specific command or set of commands (i.e. the user of the class can handle tokenization and processing of subcommands themselves), OR the user can combine the Message class with the Command class to perform subcommand dispatch according to the conventions of the Renge library.
