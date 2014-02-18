# Rainmaker Website Development Toolkit

## Requirements
* Node.JS ( http://nodejs.org/ )
* Grunt `sudo npm install -g grunt-cli`

## Setup
1. Open terminal and `cd` to the directory of this file.
2. Type `npm i`
3. Copy the contents of `./momentum.example.json` to `momentum.json`
4. Setup the values of `momentum.json` with the information you received from your account rep.

## Usage
1. Open terminal and `cd` to the directory of this file.
2. Type `grunt watch`

As you make changes to files, they will automatically synchronize with the server and with your Amazon S3 static server.

## How it Works
Everything you put in the `./lib` folder will compile into public. Your javascript will be checked for errors, your `.styl` files will be compiled. You can event setup the script so any svg files you put in `./lib/icons` compile into an icon font. (read the instructions in that folder)

Everything you put in `./public` will be automatically deployed to amazon s3 as you make changes. Every save of a file in `./lib` and `./public` triggers synchronization with s3.

Everything you put in `./theme` will automatically save to your live Rainmaker account. You can use `.lhtml` or `.jade` files. Read the readme file in `./theme` for more information on theming syntax.

## Best Practices
### Style
We recommend coding in `stylus` with `nib` (see http://learnboost.github.io/stylus/ and http://visionmedia.github.io/nib/).

Nib is a small and powerful library for the Stylus CSS language, providing robust cross-browser CSS3 mixins to make your life as a designer easier.
      
    body {
      background: linear-gradient(top, white, black);
    }
          
            
    body {
      background: -webkit-gradient(linear,
        left top,
        left bottom,
        color-stop(0, #fff),
        color-stop(1, #000));
      background: -webkit-linear-gradient(top, #fff 0%, #000 100%);
      background: -moz-linear-gradient(top, #fff 0%, #000 100%);
      background: linear-gradient(top, #fff 0%, #000 100%);
    }
