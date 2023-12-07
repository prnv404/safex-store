
# Work in progress ⚒️


## Installation 🔈

#### Install bun globally 🥪

```
npm install -g bun
```

#### Install safex package globally

```
npm install -g safex-store
```

<br>

## Usage Guide 


### safex usage

```
Usage: Safex-store [options] [command]

CLI to store credentials safely and securely

Options:
  -V, --version             output the version number
  -h, --help                display help for command

Commands:
  init                      Initialize SafeX CLI configurations
  search <key>            Search for a specific key
  all                       get all key in database
  auto                      get all key in database with prefix autosuggestion
  delete <id>               Delete a key by its ID
  insert <keyname> <value>  Insert a new key with a keyname and value
  help [command]            display help for command
```


#### initialize safex
```
safex init
```

#### Insert key 

```
safex insert <KEYNAME> <VALUE>
```

#### Search Key 

```
safex search <KEYNAME>
```

####  prefix auto suggestion 
```
safex auto 
```
#### delete key 
```
safex delete <KEYID>
```

## Task Checklist

1. **Storage Options**
    - [x] Local storage implemented
    - [x] Mongodb implemented 
    - [ ] Safex api storage

2. **Key Operations**
    - [x] Insert Key functionality
    - [x] Delete Key functionality
    - [x] Encryption of keys before storing
    - [x] Decryption of keys when retrieving

3. **Search Functionality**
    - [x] Search based on key name
    - [x] case insensitve search
    - [x] auto suggestion search

4. **Data Management**
    - [x] Reset and flush out all data 

5. **CLI View**
    - [x] safex intro
    - [x] initializing promts
    - [x] Display matching keys in a table format


### Contribution
 Contributions are welcome !

