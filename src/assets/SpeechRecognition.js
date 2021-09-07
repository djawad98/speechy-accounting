export default class Recognition{

    constructor(){

        // Initialize
        const SpeechReco = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechReco();
        this.result = null;

        // Set options
        this.recognition.continuous = false;
        this.recognition.lang = 'fa-IR';
        this.recognition.interimResults = true;
        this.recognition.maxAlternatives = 1;


        // Status
        this.states = ['STARTED','STOPPED', 'LISTENING', 'ENDED'];
        this.status = 1;

        this.recognition.onerror = ({error}) => console.warn(error);

        // Set Event handlers
        this.onEnd(() => {
            this.recognition.stop();
        });

    }

    start(){
        this.recognition.start();
    }

    stop(){
        this.recognition.stop();
    }

    abort(){
        this.recognition.abort();
    }

    onResult(callback){
        this.recognition.onresult = function(e){
            callback(e.results);
            this.status = 2;
        };

    }

    onStart(callback){
        this.recognition.onstart = function(){
            callback()
            this.status = 0;
        };

    }

    onEnd(callback){
        this.recognition.onspeechend = function(){
            callback();
            this.status = 3;
        };
    }

    onNoMatch(callback){
        this.recognition.onnomatch = function(){
            callback()
        };
    }


}