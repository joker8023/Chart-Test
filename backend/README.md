Chart-Test
================
api for Chart-Test

Table of Contents
-----------------

  * [Requirements](#requirements)
  * [Usage](#usage)
  * [Migration](#migration)
  * [Tests](#tests)

Requirements
------------

requires the following to run:

  * Python3
  * pip3

Usage
-------

 ```
     cd Chart-Test
     python3 manage.py db upgrade
     pip3 install -r requirements.txt
     python3 manage.py server --host 0.0.0.0 --port 6000
 ```

Migration
------

```
    python3 manage.py db init
    python3 manage.py db migrate
    python3 manage.py db upgrade
```


Tests
------

```
python3 manage.py db test
```



