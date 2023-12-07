
# Work in progress ⚒️


## Installation 🔈

#### Install bun globally 🥪

```
npm install -g bun
```

#### clone the repo

```
git clone https://github.com/prnv404/safex-store.git
```

#### change directory and install dependencies
```
cd safex-store && bun install
```

#### install safex to globally so we can use safex command
```
npm install -g .
```
<br>

## Usage Guide 

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

