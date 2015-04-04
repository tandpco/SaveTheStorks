# Rainmaker Website Development Toolkit

## Requirements
* Node.JS ( http://nodejs.org/ )
* Grunt `sudo npm install -g grunt-cli`

## Usage
1. Open terminal and `cd` to the directory of this file.
2. Type `grunt watch`

As you make changes to files, they will automatically synchronize with the server and with your Amazon S3 static server.

## How it Works
Everything you put in the `./lib` folder will compile into public. Your javascript will be checked for errors, your `.styl` files will be compiled. You can event setup the script so any svg files you put in `./lib/icons` compile into an icon font. (read the instructions in that folder)

Everything you put in `./public` will be automatically deployed to amazon s3 as you make changes. Every save of a file in `./lib` and `./public` triggers synchronization with s3.

Everything you put in `./theme` will automatically save to your live Rainmaker account. You can use `.lhtml` or `.jade` files. Read the readme file in `./theme` for more information on theming syntax.

## Important Notes
Please make sure that any files with the same name as an existing file are appended with "-new" before they are saved, this goes for all files on the site. Save The Storks is currently live and they experience heavy traffic, we do not want to disrupt the user experience while doing maintenance. If you are making changes to an existing file, please duplicate that file and append "-new" to the name.

Create a new "Stylus" partial for whatever CSS you add, and import it in "main.styl", at the top of the file.
