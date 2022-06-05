# Rewatch

Watch files or globs and execute arbitrary shell commands. This is a fork of an old and no longer working project created by Hsiaoming Yang. 
I updated this package because I was having trouble executing different build commands depending on different file type changes i.e. it's
unnecessary to do a full typescript recomplile if only some css changes - but the css files do need to be copied into the output folder.

With this package, you can execute different shell operations on separate sets of watched files by creating different instances of `rewatch`.
In my experience, nodemon tripped over itself when trying to accomplish this and would end up crashing and all sorts - getting into a real muddle.

## Install

Install rewatch with npm:

    $ npm install rewatch -g

## Usage

It is pretty simple, get the help menu:

    $ rewatch -h

```
Usage:
    rewatch <command> <paths...> 

Options:
    -d, --defer     Prevent rewatch from executing the specified command immediately

Examples:
    $ rewatch "npm run build" **/*.ts 
    $ rewatch "npm run copy-files" **/*.css --defer
```

## License

MIT
