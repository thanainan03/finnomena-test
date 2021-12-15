import { shallowMount } from '@vue/test-utils'
import Vuetify from 'vuetify'
import DataTable from '@/components/DataTable.vue'

describe('DataTable.vue', () => {
  let vuetify

  beforeEach(() => {
    vuetify = new Vuetify({})
  })

  it('test headers props', async () => {
    const headers = [
      { text: 'อันดับของกองทุน', align: 'left', value: 'rating', width: '15%' }
    ]

    const wrapper = await shallowMount(DataTable, { vuetify })
    await expect(wrapper.vm.$props.headers).toStrictEqual([])

    await wrapper.setProps({ headers })
    expect(wrapper.vm.$props.headers).toBe(headers)
  })
})
