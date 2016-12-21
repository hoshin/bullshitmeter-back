import fs from 'fs';
import {exec} from 'child_process';

class GoogleSpeechApi {
    constructor(){

    }
    parseGoogleResponse(response) {
        console.log("Google API response="+response);

        var results = response.split("\n");

        console.log(results);

        var result = JSON.parse(results[1]).result[0].alternative[0].transcript;
        console.log("RESULT > " + result);

        return result;
    }
    requestGoogle(callback) {
        var self = this;
        exec("curl -X POST --data-binary @'tmp/file.wav' --header 'Content-Type: audio/l16; rate=16000;' 'https://www.google.com/speech-api/v2/recognize?output=json&lang=fr-fr&key=AIzaSyAHH8P375r9bN4L4xpdeszrWPx8vIHgn4k'", function (error, stdout, stderr) {
            var isError = stdout.indexOf("<title>Error 403 (Forbidden)") > -1;
            var isEmpty = (stdout.length < 30);
            console.log("Called Google API with stdout =" + stdout);
            console.log("is error =" + isError);
            console.log("is empty =" + isEmpty + "length is :"+stdout.length);
            if (isError) {
                console.log("403 ... retrying ...")
                self.requestGoogle(callback);
            }
            else if(isEmpty) {
                console.log("Got empty response ... retrying ...")
                self.requestGoogle(callback);
            }
            else {
                var parsedText = self.parseGoogleResponse(stdout);
                console.log("Parsed response from google = "+parsedText);
                callback(stderr, parsedText);
            }
        });
    }

    readSound(soundPath, callback) {
        var self = this;
        var filePath = "tmp/file.wav";
        if (fs.existsSync(filePath)) {
            fs.unlinkSync(filePath);
        }

        //convert m4a into wav
        exec("ffmpeg -y -i " + soundPath + " -ar 16000 -acodec pcm_s16le -ac 1 tmp/file.wav", function (error, stdout, stderr) {
            if (stderr) {
                console.log(stderr);
            }
            if (error) {
                console.log(error);
            }
            self.requestGoogle(function (err, data) {
                callback(err, data);
            });
        });

    }

}

export {GoogleSpeechApi};
