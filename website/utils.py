import requests
import hashlib
import json
from rest_framework import status
from rest_framework.response import Response


def details_from_bvn(bvn, ref):
    url = 'https://api.onepipe.io/v1/generic/transact'
    myobj = {
        "request_ref": ref,
        "request_type": "bvn_lookup",
        "auth": {
            "type": "",
            "secure": "",
            "auth_provider": "SunTrust"
        },
        "transaction": {
            "amount": "",
            "transaction_ref": ref,
            "transaction_desc": "My narration",
            "transaction_ref_parent": "",
            "customer": {
                "customer_ref": "2348022221412",
                "firstname": "{{customer.firstname}}",
                "surname": "{{customer.surname}}",
                "email": "opeadeoye@gmail.com",
                "mobile_no": "2348022221412"
            },
            "details": {
                "bvn": bvn,
                "otp_validation": False
            }
        }
    }
    headers = {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_5) AppleWebKit/537.36 (KHTML, like Gecko)'
                      ' Chrome/50.0.2661.102 Safari/537.36',
        'Authorization': 'Bearer 9aLI01bWCu8dOC5PlNIs_67782cc9350b4be58a41ae74ceec3303',
        'Signature': hashlib.md5(str.encode(ref + ';' + 'lLWD9NGlgYjYuySb')).hexdigest()
    }
    x = requests.post(url, data=json.dumps(myobj), headers=headers)
    results = {}
    
    if x.json()['status'] == 'Failed':
        return False
    else:
        print(x.json())
        results['first_name'] = x.json()['data']['provider_response']['firstName']
        results['middle_name'] = x.json()['data']['provider_response']['middleName']
        results['last_name'] = x.json()['data']['provider_response']['lastName']
        results['state_of_origin'] = x.json()['data']['provider_response']['stateOfOrigin']
        results['date_of_birth'] = x.json()['data']['provider_response']['dateOfBirth']
        results['title'] = x.json()['data']['provider_response']['title']
        results['nationality'] = x.json()['data']['provider_response']['nationality']
        results['state_of_residence'] = x.json()['data']['provider_response']['stateOfResidence']
        results['email'] = x.json()['data']['provider_response']['email'].lower()
        results['marital_status'] = x.json()['data']['provider_response']['maritalStatus']
        results['phone_number'] = x.json()['data']['provider_response']['phoneNumber1']
        results['gender'] = x.json()['data']['provider_response']['gender']
        results['residential_address'] = x.json()['data']['provider_response']['residentialAddress']
        results['city'] = x.json()['data']['provider_response']['lgaOfResidence']
    return results



def compare_dates(date_from_api, date_by_loanee):
    splitted_loanee_date = date_by_loanee.split('-')
    splitted_date_from_api = date_from_api.split('-')
    month_match = {'Jan': '01', 'Feb': '02', 'Mar': '03', 'Apr': '04', 'May': '05',
                   'Jun': '06', 'Jul': '07', 'Aug': '08', 'Sep': '09', 'Oct': '10', 'Nov': '11', 'Dec': '12'}
    new_output = [0, 1, 2]
    new_output[0] = splitted_date_from_api[2]
    new_output[1] = month_match[splitted_date_from_api[1]]
    new_output[2] = splitted_date_from_api[0]
    if (splitted_loanee_date == new_output):
        return True
    else:
        return False