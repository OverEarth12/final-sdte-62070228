<template>
  <div>
    <div class="container">

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">ค้นหา 'คณะ'</label>
              <div class="control">
                <div class="select" style="width:100%">
                  <select style="width:100%" >
                    <option v-for="(item,i) in faculity" :key="i">{{item}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">ค้นหา 'รอบรับสมัคร'</label>
              <div class="control">
                <div class="select" style="width:100%">
                  <select style="width:100%">
                    <option v-for="(item,i) in round" :key="i">{{item}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">ค้นหา 'โครงการ'</label>
              <div class="control">
                <div class="select" style="width:100%">
                  <select style="width:100%">
                    <option v-for="(item,i) in projects" :key="i">{{item}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="column">
            <div class="field">
              <label class="label">ค้นหาหลักสูตร ไทย / นานาชาติ</label>
              <div class="control">
                <div class="select" style="width:100%">
                  <select style="width:100%">
                    <option v-for="(item,i) in course" :key="i">{{item}}</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="field">
          <label class="label">คำค้นหาเพิ่มเติม [ระบบจะค้นจากชื่อคณะ,หลักสูตร]</label>
          <div class="control">
            <input class="input" v-model="keyword" type="text" placeholder="Text input">
          </div>
        </div>
        <button class="button is-link" @click="searchProject()">Click</button>

        <p>ทั้งหมด : {{count}} ผลลัพท์</p>
        <div>
          <article class="message mt-3" v-for="(item,i) in all" :key="i">
            <div class="message-header">
              <p>{{ item.name }}</p><br> <p>{{ item.tag.round }}</p><p>{{item.tag.project}}</p>
            </div>
            <div class="message-body">
              คณะ: {{item.tag.faculity}}<br/>
              หลักสูตร: {{item.tag.course}}<br/>
              วันที่รับสมัคร: {{item.date}}<br/>
              {{item.description}}
            </div>
            <div class="columns">
              <div class="column">
                  <button class="button is-link">สมัคร</button>
              </div>
              <div class="column">
                  <button class="button is-link">ประกาศรับสมัคร</button>
              </div>
              <div class="column">
                  <button class="button is-link">คุณสมบัติ</button>
              </div>
            </div>
          </article>
        </div>
    </div>
</div>
</template>

<script>
import axios from 'axios'
export default {
  
  data() {
    return {
     faculity: [],
     round: [],
     projects: [],
     course: [],
     all: [],
     count: 0,
     keyword: ""
    }
  },
  methods: {
    getData(){
      axios.get('http://localhost:3001/getSelection')
      .then(response => {
        this.faculity = [">Select dropdown", ...response.data[0].faculity]
        this.round = [">Select dropdown", ...response.data[0].round]
        this.projects = [">Select dropdown", ...response.data[0].project]
        this.course = [">Select dropdown", ...response.data[0].course]
      })
    },
    getProject(){
      axios.get('http://localhost:3001/getResult')
      .then(response => {
        console.log(response.data)
        this.all = response.data
        this.count = this.all.length
        console.log(response.data)
      })
    },
    searchProject(){
      console.log(this.keyword)
      axios.get('http://localhost:3001/getbykey',{
  data: {
    keyword: this.keyword
  }}).then(response => {
        this.all = response.data
        this.count = this.all.length
        console.log(response.data)
      })
    }
  },
  created() {
    this.getData()
    this.getProject()
  }
}
</script>

<style>

</style>