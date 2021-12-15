#### 1. ใช้เวลาทำแบบทดสอบไปเท่าไร ถ้ามีเวลามากกว่านี้จะทำอะไรเพิ่ม ถ้าใช้เวลาน้อยในการทำโจทย์สามารถใช้โอกาสนี้ในการอธิบายได้ว่าอยากเพิ่มอะไร หรือแก้ไขในส่วนไหน

ใช้เวลา 3 วัน อยากจะเพิ่ม % ความต่างของระยะเวลากับผลตอบแทน

#### 2. อะไรคือ feature ที่นำเข้ามาใช้ในการพัฒนา application นี้ กรุณาแนบ code snippet มาด้วยว่าใช้อย่างไร ในส่วนไหน

เพิ่มการแสดงผล แผนภูมิเชิงเส้น แสดงผลตอบแทนเรียงตามวันที่ัพเดต
```
Vue.component('LineChart', {
  extends: Line,
  mixins: [mixins.reactiveProp],
  props: ['data', 'options', 'chartData'],
  watch: {
    data (val) {
      this.renderChart(val, this.options)
    },
    options (val) {
      this.renderChart(this.data, val)
    }
  },
  mounted () {
    this.renderChart(this.data, this.options)
  }
})
```

#### 3. เราจะสามารถติดตาม performance issue บน production ได้อย่างไร เคยมีประสบการณ์ด้านนี้ไหม

มีการ monitor และ tracking error พวก log ต่าง ๆ โดยที่ log ต้องเป็นสิ่งที่เข้าใจได้ทันที พร้อมที่จะแก้ไขและ hotfix ขึ้น production

#### 4. อยากปรับปรุง FINNOMENA APIs ที่ใช้ในการพัฒนา ในส่วนไหนให้ดียิ่งขึ้น

อยากปรับปรุงตัวที่เป็น "status": true ซึ่งก็พอเข้าใจว่ามีการทำงานสำเร็จ แต่ถ้ามีข้อความอธิบายเพิ่มเติม น่าจะมีความเข้าใจ API ตัวนี้มากว่านี้
