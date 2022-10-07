import * as yup from 'yup'

const validations = yup.object().shape({
    name:yup.string().required('Film ismi giriniz'),
    director:yup.string().required('Yönetmen giriniz'),
    point:yup.string().required('Puan giriniz'),
    posterUrl:yup.string().required('Url adresi giriniz'),
    title:yup.string().required('Açıklama giriniz'),
    iframe:yup.string().required('İframe için url giriniz')

})
export default validations
