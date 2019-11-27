<template>
  <div class="hello">
    <section class="container col-md-6 mt-3">
      <div class="questionBox">
        <transition
          :duration="{ enter: 500, leave: 300 }"
          enter-active-class="animated zoomIn"
          leave-active-class="animated zoomOut"
          mode="out-in"
        >
          <div
            class="questionContainer"
            v-if="questionIndex<quiz.questions.length"
            v-bind:key="questionIndex"
          >
            <header>
              <h1 class="title is-6">Encuesta</h1>
              <div class="progressContainer">
                <b-progress :max="100">
                   <b-progress-bar :value="(questionIndex/quiz.questions.length)*100"
                                   :class="[(genero=='mujer')?'pink':'is-info']">
                    <p>{{((questionIndex/quiz.questions.length)*100).toFixed(2)}}% progreso</p>
                  </b-progress-bar>
                </b-progress>
              </div>
            </header>

            <h2 class="titleContainer title">{{ (false !== !!genero)?quiz.questions[questionIndex].q[genero]:quiz.questions[questionIndex].q.hombre }}</h2>
            <div class="optionContainer">
              <div
                class="option"
                v-for="(response, index) in quiz.questions[questionIndex].responses"
                @click="selectOption(index)"
                :class="{ 'is-selected': userResponses[questionIndex] == index}"
                :key="index"
              ><span class="badge badge-info pull-left">{{ index | charIndex }}.</span> {{ response.r }} <i class="fas fa-check"></i></div>
            </div>
            <footer class="questionFooter">
              <nav class="pagination" role="navigation" aria-label="pagination">
                <div class="container col-12">
                  <div class="row">
                    <div class="col-6"><b-button @click="prev()" :disabled="questionIndex < 1">Anterior</b-button></div>
                    <div class="col-6">
                      
                      <b-button :class="[userResponses[questionIndex]!==null?'is-active':'',genero=='mujer'?'pink':'']"
                                :disabled="isDisabled"
                                @click="next()">Siguiente</b-button>
                    </div>
                  </div>
                </div>
              </nav>
            </footer>
          </div>
          <div
            v-if="questionIndex >= quiz.questions.length"
            v-bind:key="questionIndex"
            class="quizCompleted has-text-centered">
            <span class="icon">
              <i class="fa" :class="score()>0?'fa-check-circle-o is-active':'fa-thumbs-up'"></i>
            </span>
            <h2 class="title">Se redirige al landing: {{finalLandingPage}}</h2>
            <br>
            <a class="button" @click="restart()">restart <i class="fa fa-refresh"></i></a>
          </div>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
import Vue from 'vue'
import firebase from '../Firebase'

var quiz = {
    user: "Norberto",
    questions: [
      {
        q:{
          text:'¿Eres hombre o mujer?'
        },
        responses: [
          { r: "Soy Hombre" },
          { r: "Soy Mujer" }
        ]
      },
      {
        q:{
          mujer:'¿Cuantos años tienes?',
          hombre:'¿Qué edad tienes?'
        },
        responses:[
          {r:"15 - 20 años"},
          {r:"21 - 25 años"},
          {r:"26 - 30 años"},
          {r:"31 - 35 años"},
          {r:"36 - 40 años"},
          {r:"41 - 45 años"},
        ]
      },
      {
        q:{
          mujer:'¿Estas casada?',
          hombre:'¿Estas casado?'
        },
        responses:[
          {r:"Sí"},
          {r:"No"},
        ]
      },
      {
        q:{
          mujer:'¿Vives en Apodaca?',
          hombre:'¿Vives en Apodaca?'
        },
        responses:[
          {r:"Sí"},
          {r:"No"},
        ]
      },
      {
        q:{
          mujer: "¿Le ha dicho su proveedor que usted va a tener gemelos o más de un bebé? ",
          hombre:'¿Sabes que significa HTTP?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿Es esta la primera vez que ha estado embarazada?',
          hombre:'¿sabes que es el estado de una variable?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿ha tenido que acudir a la sala de emergencias debido a un problema relacionado con el embarazo?',
          hombre:'¿sabes por qué coches con el mismo cilindraje tienen diferentes consumos?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿ha sido hospitalizada debido a un problema relacionado con el embarazo?',
          hombre:'¿La altura también afecta a los motores con turbo?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿Alguna vez le han dicho que tiene algún tipo de diabetes?',
          hombre:'¿Los "autos modernos" necesitan calentar antes de ponerlos en marcha?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:' ¿a menudo le ha preocupado sentirse triste, deprimida o sin esperanza?',
          hombre:'¿Un motor nuevo o reparado necesita ser "asentado" antes de usarlo?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿ha tenido alguna enfermedad de transmisión sexual?',
          hombre:'¿sabes cuál es la duración media de un coche?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿Se pinta las uñas de los pies?',
          hombre:'¿Está pensando en pintar su auto?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿Sabe cuando exactamente sera el parto?',
          hombre:'¿Es usted una persona puntual o siempre llega tarde?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      },
      {
        q:{
          mujer:'¿Ya tiene escogido al pediatra que atenderá a su bebé? ',
          hombre:'¿Tienes alguna adicción?'
        },
        responses: [
          { r: "si", value:1 },
          { r: "No", value: 2 },
          { r: "A veces", value:0 },
        ]
      }
    ]
  },
  userResponseSkelaton = Array(quiz.questions.length).fill(null);
export default {
  name: 'Encuesta',
  props: {
    msg: String
  },
  data: function() {
    return {
      quiz: quiz,
      questionIndex: 0,
      userResponses: userResponseSkelaton,
      genero:null,
      isActive: false,
      saved: false,
      show: false,
      finalLandingPage:null,
      ref: firebase.firestore().collection('questions'),
      users: firebase.firestore().collection('encuestados')
    };
  },
  filters: {
    charIndex: function(i) {
      return String.fromCharCode(97 + i);
    }
  },
  methods: {
    toggle() {
      console.log('Toggle button clicked')
      this.show = !this.show
    },
    dismissed() {
      console.log('Alert dismissed')
    },
    restart: function() {
      this.userResponses = Array(this.quiz.questions.length).fill(null);
      this.genero = null;
      this.questionIndex = 0;
      this.saved = false;
      
    },
    selectOption: function(index) {
      Vue.set(this.userResponses, this.questionIndex, index);
    },
    next: function() {
      // console.log(this.quiz.questions.length);
      if (this.questionIndex < this.quiz.questions.length) this.questionIndex++;
      window.scrollTo(0,0);
    },
    prev: function() {
      if (this.quiz.questions.length > 0) this.questionIndex--;
    },
    score: function() {
      var resultados = new Array;
      for(let i in this.userResponses){
        resultados.push((undefined !== this.quiz.questions[i].responses[this.userResponses[i]].value)?this.quiz.questions[i].responses[this.userResponses[i]].value:'');
      }
      this.finalLandingPage = (resultados.includes( 1 ))?1:(resultados.includes( 2 ))? 2 : 0;
      this.saveSurvey();
      return(this.finalLandingPage)
    },
    saveSurvey: function() {
      if(false == this.saved){
        this.saved = true;
        let toSave = new Object;
          toSave ={
            submited: new Date(),
            gender: this.genero,
            responses: this.userResponses,
          }
        this.users.add(toSave).then(() => {
          console.log('enviar a la ruta: '+ this.score);
        })
        .catch((error) => {
          alert("Error adding document: ", error);
        });
      }
    }
  },
  watch: {
    show(newVal) {
      console.log('Alert is now ' + (newVal ? 'visible' : 'hidden'))
    },
    userResponses(newVal){
      this.genero = (newVal[0]===1)?'mujer':'hombre';
    }
  },
  computed:{
    isDisabled() {
      return (null !== this.userResponses[this.questionIndex] && this.userResponses[this.questionIndex] >= 0)?false:true;
    }
  },
  created: function(){
    this.ref.orderBy("date", "asc").onSnapshot((querySnapshot)=>{
      this.quiz.questions = [];
      querySnapshot.forEach((doc)=>{
        this.quiz.questions.push(doc.data())
      });
    });
  }
}
</script>
<style lang="scss" scoped>
$trans_duration: 0.3s;
$primary_color: #4281f8;

@import url("https://fonts.googleapis.com/css?family=Montserrat:400,400i,700");
@import url("https://fonts.googleapis.com/css?family=Open+Sans:400,400i,700");

body {
  font-family: "Open Sans", sans-serif;
  font-size: 14px;

  height: 100vh;

  background: #CFD8DC;

  /* mocking native UI */
  cursor: default !important; /* remove text selection cursor */
  user-select: none; /* remove text selection */
  user-drag: none; /* disbale element dragging */

  display: flex;
  align-items: center;
  justify-content: center;
}

.button {
  transition: $trans_duration;
}
.title,
.subtitle {
  font-family: 'Roboto Condensed', sans-serif;
  font-weight: normal;
  color: gray;
}
.animated {
  transition-duration: $trans_duration/2;
}

.container {
  margin: 0 auto;
}

.questionBox {

  background: #FAFAFA;
  position: relative;
  display: flex;

  border-radius: 0.5rem;
  overflow: hidden;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  margin: 20px auto;

  header {
    background: rgba(0, 0, 0, 0.025);
    padding: 1.5rem;
    text-align: center;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);

    h1 {
      margin-bottom: 1rem !important;
    }
    .progressContainer {
      width: 60%;
      margin: 0 auto;
      .progress {
        width: 100%;
        margin: 0;
        border-radius: 5rem;
        overflow: hidden;
        border: none;
        
        .progress-bar{
          &.pink{
            background-color: darken(pink, 10%);
            
            p{
              color:crimson;
            }
          }
          p{
            color: black;
            width: 53%;
            position: absolute;
            margin: 0 auto;
            padding: 0;
          }
        }

        // color: $primary_color;
        &::-moz-progress-bar {
          background: $primary_color;
        }
        &::-webkit-progress-value {
          background: $primary_color;
        }
      }
      > p {
        margin: 0;
        margin-top: 0.5rem;
        color:black;
      }
    }
  }
  .titleContainer {
    text-align: center;
    margin: 0 auto;
    padding: 1.5rem;
  }

  .quizForm {
    display: block;
    white-space: normal;

    height: 100%;
    width: 100%;

    .quizFormContainer {
      height: 100%;
      margin: 15px 18px;

      .field-label {
        text-align: left;
        margin-bottom: 0.5rem;
      }
    }
  }
  .quizCompleted {
    width: 100%;
    padding: 1rem;
    text-align: center;

    > .icon {
      color: #FF5252;
      font-size: 5rem;

      .is-active {
        color: #00E676;
      }
    }
  }
  .questionContainer {
    white-space: normal;

    height: 100%;
    width: 100%;

    .optionContainer {
      margin-top: 12px;
      flex-grow: 1;
      .option {
        border-radius: 290486px;
        padding: 9px 18px;
        margin: 0 18px;
        margin-bottom: 12px;
        transition: $trans_duration;
        cursor: pointer;
        background-color: rgba(0, 0, 0, 0.05);
        color: rgba(0, 0, 0, 0.85);
        border: transparent 1px solid;

        svg{
          display: none;
        }

        &.is-selected {
          border-color: rgba(black, 0.25);
          background-color: white;
          position: relative;
          svg{
            display: block;
            position: absolute;
            right: 12px;
            top: 13px;
          }
        }
        &:hover {
          background-color: rgba(0, 0, 0, 0.1);
        }
        &:active {
          transform: scaleX(0.9);
        }

        span{
          position: relative;
          float: left;
          top: 3px;
        }
      }
    }
    footer{
      background: rgba(0, 0, 0, 0.025);
      border-top: 1px solid rgba(0, 0, 0, 0.1);

      padding: 25px 25px;
      width: 100%;
      align-self: flex-end;

      .questionFooter {
        background: rgba(0, 0, 0, 0.025);
        border-top: 1px solid rgba(0, 0, 0, 0.1);
        width: 100%;
        align-self: flex-end;
      }
    }
  }
}
.pagination {
  display: flex;
  justify-content: space-between;
}
button {
  padding: 0.5rem 1rem;
  border: 1px solid rgba(0, 0, 0, 0.25);
  border-radius: 5rem;
  margin: 0 0.25rem;

  transition: 0.3s;

  &.pink{
    &:hover {
      background: lightsalmon;
    }
    &.is-active{
      background: pink;
      color: crimson;
      border-color: transparent;

      &:hover {
        background: darken(pink, 5%);
      }
    }
  }

  &:hover {
    cursor: pointer;
    background: #ECEFF1;
    border-color: rgba(0, 0, 0, 0.25);
  }
  &.is-active {
    background: $primary_color;
    color: white;
    border-color: transparent;

    &:hover {
      background: darken($primary_color, 10%);
    }
  }
}

@media screen and (min-width: 769px) {
  .questionBox {
    align-items: center;
    justify-content: center;

    .questionContainer {
      display: flex;
      flex-direction: column;
    }
  }
}

@media screen and (max-width: 768px) {
  .sidebar {
    height: auto !important;
    border-radius: 6px 6px 0px 0px;
  }
}
.questionBox header .progressContainer .progress .progress-bar.pink span p {
    border: solid 1px red;
    color:black;
}
</style>
