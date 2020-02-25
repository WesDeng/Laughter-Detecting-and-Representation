# -*- coding: utf-8 -*-
import os
import json


def get_filelist(dir):
    result = []
    for home, dirs, files in os.walk(dir):
        #print("#######file list#######")
        for filename in files:
            if filename.endswith('.mp3'):
                cityname = filename.strip('.mp3')
                fullname = os.path.join(home, filename)
                # print(fullname)
                ele = (cityname, fullname)
                result.append(ele)
    return result

def generate_json(path,file):

    result_info = {}
    task = {}
    task['feedback'] = 'none'
    task['visualization'] = 'spectrogram'
    task['proximityTag'] = []
    task['annotationTag'] = ["Laughter_1", "Laughter_2", "Laughter_3", "Laughter_4", "Laughter_5"]
    task['url'] = '/static/wav/'+file+'.wav'
    task['tutorialVideoURL'] = "https://www.youtube.com/embed/Bg8-83heFRM"
    task['alwaysShowTags'] = True
    result_info['task'] = task

    with open(path+'/'+file+'.json', 'w') as fp:
        json.dump(result_info, fp=fp)



if __name__ == '__main__':
    input_file_path = '/Users/wesley/Desktop/youtube'
    output_file_path='/Users/wesley/Desktop/youtube_json'
    # input_file_path = '/Users/lisongfeng/PycharmProjects/fileprocess/youtube'
    # output_file_path='/Users/lisongfeng/PycharmProjects/fileprocess/youtube/result'

    if os.path.exists(output_file_path) ==  False:
        os.mkdir(output_file_path)
    result = get_filelist(input_file_path)
    for i in result:
        generate_json(output_file_path,i[0])