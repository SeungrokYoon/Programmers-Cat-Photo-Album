const API_END_POINT = "https://zl3m4qq0l9.execute-api.ap-northeast-2.amazonaws.com/dev"
const IMAGE_END_POINT ="https://fe-dev-matching-2021-03-serverlessdeploymentbuck-t3kpj3way537.s3.ap-northeast-2.amazonaws.com/public"

const request = async (url) =>{
    try{
        const res = await fetch(`${API_END_POINT}${url}`)
        if(!res.ok){
            throw new Error('API 호출실패')
        }
        return await res.json()
    }catch(e){
        alert(e.message)
    }
}

export {request, IMAGE_END_POINT}