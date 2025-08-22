# [FRONT] Show Milhão

- Before
    - Check if it has already started
# New
- Check
- /match/start
- /match/next -> get question
- /match/answer/{index}
    - Verify whether it is correct or not
    - Show resume, if it's wrong
    - 




# Continue
- 


# In-game actions
- stop
- skip
- 50/50
- universitaries






# Question
## Hint
1. 
```
{
  "id": 158,
  "isBr": false,
  "label": "What do we use to eat soup?",
  "option1": "X",
  "option2": "Knife",
  "option3": "Spoon",
  "option4": "X",
  "level": 1
}
```


Univer

```
{
  "id": 158,
  "option1": 2,
  "option2": 8,
  "option3": 82,
  "option4": 8
}
```
- Armazenar localmente e bloquear chamadas extras
- Store locally and block extra calls
- When reach /match, check whether ID is the same as the question ID




## Componentes
/match

- help
- question + answers
    - label
    - question
        - Control each question
    - btn
- prizes 


### States
/match

- match status
- Hint (include the hint and the type)


question -> getter + state + local 

- receive: hint (on change -> update local storage and question)
hint -> hint





# Asnwer
- miss
```
{
  "isCorrect": false,
  "correctAnswer": 1,//index
  "finalPrize": 0,
  "points": 0
}
```
- correct:r
```
{
  "isCorrect": true
  "points": x// just if million
}
```
- REMEMBER: Index starts at 1
- 


