from flask import Flask, request, jsonify, json
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources='/*')


@app.route('/', methods=['POST'])
def gpa():
    data = request.get_json()
    resData = solve(data)
    res = {'status': 'success', 'data': resData}
    return jsonify(res), 200


def solve(data):
    list_of_grades =[]
    for i in range(len(data['grades'])):
        grade_score = check_grade(data['grades'][i])
        unit = data['units'][i]
        cum_score = grade_score * unit
        list_of_grades.append(
        {'grade': grade_score, 'unit': unit, 'cum_score': cum_score})
    return output(list_of_grades)

def check_grade(a):
    # check if string contains integer
    if a.isnumeric():
        if (int(a) <= 100 and int(a) >= 70):
            return 5
        elif (int(a) < 70 and int(a) >= 60):
            return 4
        elif (int(a) < 60 and int(a) >= 50):
            return 3
        elif (int(a) < 50 and int(a) >= 45):
            return 2
        elif (int(a) < 45 and int(a) >= 40):
            return 1
        elif (int(a) < 40 and int(a) >= 0):
            return 0
        else:
            print('INVALID!!')
            return 'invalid'
     # else string does not contain integer
    else:
        if a.lower() == 'a':
            return 5
        elif a.lower() == 'b':
            return 4
        elif a.lower() == 'c':
            return 3
        elif a.lower() == 'd':
            return 2
        elif a.lower() == 'e':
            return 1
        elif a.lower() == 'f':
            return 0
        else:
            print('INVALID!!')
            return 'invalid'

def output(list_of_grades):
    # get total units
    total_units = 0
    total_cum_score = 0

    for x in list_of_grades:
        total_units += x['unit']
        total_cum_score += x['cum_score']

    GP = total_cum_score / total_units
    GP = (f'{GP:.2f}')
    return 'Your GPA is: ' + GP

    # if float(GP) >= 4.5 and float(GP) <= 5.0:
    #     print('This is an excellent result!')
    # elif float(GP) >= 3.5 and float(GP) < 4.5:
    #     print('This is great! You can do even better!')
    # elif float(GP) >= 3.0 and float(GP) < 3.5:
    #     print('Good result! Push harder for better.')
    # elif float(GP) >= 2.5 and float(GP) < 3.0:
    #     print('You need to do better.')
    # else:
    #     print('OMO!')

if __name__ == '__main__':
    app.run(debug=False, host='0.0.0.0')