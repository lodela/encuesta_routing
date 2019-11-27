<template>
<b-container cols="12">
    <b-row>
      <b-col></b-col>
      <b-col cols="12" sm="10" lg="8" xl="6">
        <h2>Board List</h2>
        <b-link @click.stop="addEdit()">(Agregar pregunta)</b-link>
        <b-table striped hover :items="boards" :fields="fields" responsive="sm">
            <template v-slot:cell(index)="data">
                {{ data.index + 1 }}
            </template>
            <template v-slot:cell(questions)="data">
                <b-row>
                    <b-col sm="3" class="text-sm-right"><b>Mujer:</b></b-col>
                    <b-col class="text-sm-left">{{ data.item.questions.mujer }}</b-col>
                </b-row>
                <b-row>
                    <b-col sm="3" class="text-sm-right"><b>Hombre:</b></b-col>
                    <b-col class="text-sm-left">{{ data.item.questions.hombre }}</b-col>
                </b-row>
            </template>
          <template v-slot:cell(Actions)="row">
            <b-button-group>
              <b-button size="sm" variant="outline-dark" @click="row.toggleDetails">
                <font-awesome-icon icon="eye"/>
              </b-button>
              <b-button size="sm" variant="outline-danger" @click.stop="deleteboard(row.item.key)">
                <font-awesome-icon icon="trash-alt"/>
              </b-button>
              <b-button size="sm" variant="outline-primary" @click.stop="addEdit(row.item)">
                <font-awesome-icon icon="edit"/>
              </b-button>
            </b-button-group>
          </template>
          <template v-slot:row-details="row">
            <b-card>
              <b-row class="mb-2" v-for="response in row.item.responses" v-bind:key="response.index">
                <b-col sm="3" class="text-sm-right"><b>Respuesta:</b></b-col>
                <b-col class="text-sm-left">{{ response.r }}</b-col>
                <b-col class="text-sm-left">Valor: {{(!response.value && 0 !== response.value)?'Informativa':response.value}}</b-col>
              </b-row>
            </b-card>
          </template>
        </b-table>
      </b-col>
      <b-col></b-col>
    </b-row>
    <b-modal
      v-model="show"
      id="editBoard"
      ref="modal"
      :title="formTitle"
      @ok="handleOk">
    <b-form ref="form" @submit.stop.prevent="handleSubmit">
        <b-card bg-variant="light">
            <b-form-group
                label-cols-lg="3"
                label="Preguntas"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0">
            </b-form-group>
            <b-form-group
                :state="nameState"
                label="Mujer"
                label-for="mujer-input-pregunta"
                invalid-feedback="is required">
                <b-form-input
                    id="mujer-input-pregunta"
                    size="sm"
                    v-model="questions.mujer"
                    :state="nameState"
                    required></b-form-input>
            </b-form-group>
            <b-form-group
                :state="nameState"
                label="Hombre"
                label-for="hombre-input-pregunta"
                invalid-feedback="is required">
                <b-form-input
                    id="hombre-input-pregunta"
                    size="sm"
                    v-model="questions.hombre"
                    :state="nameState"
                    required></b-form-input>
            </b-form-group>
        </b-card>
        <b-card bg-variant="light">
            <div class="mb-3 float-sm-right addResponseInput" >
                <b-button-group size="sm">
                    <b-button @click.stop="add()" variant="success"><font-awesome-icon icon="plus-circle"/></b-button>
                </b-button-group>
            </div> 
            <b-form-group
                label-cols-sm="6"
                label="Respuestas"
                label-size="lg"
                label-class="font-weight-bold pt-0"
                class="mb-0">
            </b-form-group>
            <div class="input-group" v-for="(input,k) in responses" :key="k">
                <b-form-input
                    v-model="input.r"
                    size="sm"
                    cols="8"></b-form-input>
                <b-form-select
                    v-model="input.value"
                    size="sm" 
                    class="input-group-append col-4"
                    :options="options"></b-form-select>
                <div class="mb-3 float-sm-right" >
                    <b-button-group size="sm">
                        <b-button @click="remove(k)" v-show="k || ( !k && responses.length > 1)" variant="danger"><font-awesome-icon icon="minus-circle"/></b-button>
                    </b-button-group>
                </div>
            </div>
        </b-card>
      </b-form>
    </b-modal>
</b-container>
</template>

<script>
import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'BoardList',
  props: {
    msg: String
  },
  data (){
    return {
      fields:[
        // { title:{label:'Title',sortable:true, 'class':'text-left'}}, 'Actions'
        'index',{questions:{label:'Preguntas',sortable:true, 'class':'text-left'}}, 'Actions'
      ],
      boards:[],
      addEditBoard:{},
      show:false,
      formTitle:'Editar una pregunta',
      isEdit:null,
      errors:[],
      editKey: null,
      editDate:null,
      questions:{
          mujer:null,
          hombre:null
      },
      responses: [
          {
              r:'',
              value:''
          }
      ],
      options: [
        { value: '', text: 'Seleccione una opción' },
        { value: null, text: 'Informativo' },
        { value: 1, text: '1' },
        { value: 2, text: '2' },
        { value: 0, text: '0' }
      ],
      nameState: null,
      ref: firebase.firestore().collection('questions')
    }
  },
  methods:{
    add(index) {
        console.log(index);
        this.responses.push({ r: '', value:'' });
    },
    remove(index) {
        this.responses.splice(index, 1);
    },
    details(board){
      router.push({name:'ShowBoard',params:{id:board.key}})
    },
    addEdit(data){
      if(data){
        console.log(data);
        this.editKey = data.key;
        this.editDate= data.date;
        this.questions = data.questions;
        this.responses = data.responses;
        this.isEdit = true;
        this.formTitle = 'Editar Pregunta';
      }else{
        this.isEdit = false;
        this.formTitle = 'Agregar Pregunta';
        this.resetModal();
      }
      this.show = true;
    },
    deleteboard (id) {
      this.ref.doc(id).delete().then(() => {
        
      }).catch((error) => {
        alert("Error removing document: ", error);
      });
    },
    resetModal() {
      this.responses = [{r:'', value:''}];
      this.editKey= null;
      this.editDate = null;
      this.questions={
          mujer:null,
          hombre:null
      };
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault()
      // Trigger submit handler
      this.handleSubmit()
    },
    checkFormValidity() {
      return this.$refs.form.checkValidity()
    },
    handleSubmit() {
      if (false === !!this.checkFormValidity()) {
        // this.nameState = 'invalid';
        return
      }
      let toSave = new Object;
          toSave={
              date:(true == !!this.isEdit)?this.editDate:new Date(),
              q:{
                  mujer:this.questions.mujer,
                  hombre:this.questions.hombre
              },
              responses:this.responses
          }
      if(true == !!this.isEdit){
        const updateRef = this.ref.doc(this.editKey);
              updateRef.set(toSave).then(()=> {
                this.$refs.modal.hide();
              }).catch((error) => {
                alert("Error adding document: ", error);
              });
      }else{
        this.ref.add(toSave).then(() => {
          this.$refs.modal.hide();
        })
        .catch((error) => {
          alert("Error adding document: ", error);
        });
      }
    }
  },
  created(){
    this.ref.orderBy("date", "asc").onSnapshot((querySnapshot)=>{
      this.boards = [];
      querySnapshot.forEach((doc)=>{
        this.boards.push({
          key: doc.id,
          questions: doc.data().q,
          responses: doc.data().responses,
          date: doc.data().date
        });
      });
    })
  },
  computed: {
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.container{
    margin-top: 100px;
    margin-bottom: 100px;
    min-height: 100vh;
}
.table{
    width:70%;
    margin: 100px auto;

  p{
      border:solid 1px blue;

      .text-female{
          color:pink;
      }
      
  }
}
</style>