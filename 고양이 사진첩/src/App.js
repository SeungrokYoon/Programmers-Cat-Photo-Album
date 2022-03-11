import Nodes from "./Nodes.js"
import {request, IMAGE_END_POINT} from "./api.js"
import ImageViewer from "./ImageViewer.js"
import Breadcrumb from "./Breadcrumb.js"
import Loading from "./Loading.js"

export default function App({target}){
  this.cache= new Map()
  this.state = {
    isRoot: true,
    nodes:[],
    imageUrl: null,
    paths: [{id: '0',name:'root'}],
    isLoading: false
  }
  this.setState = (nextState) =>{
    this.state = nextState
    
    nodes.setState({
      isRoot: this.state.isRoot,
      nodes: this.state.nodes,
    })

    imageViewer.setState({
      imageUrl:this.state.imageUrl
    })

    breadcrumb.setState({paths: [...this.state.paths]})

    loading.setState(this.state.isLoading)
  }

  const fetchNodes = async (id) =>{
    this.setState({...this.state, isLoading:true})
    if(!Object.keys(this.cache).length){
      if(!id){
        const nodes = await request(id? `/${id}`: '')
        this.cache[0] = [...nodes]
        this.setState({...this.state, nodes, isRoot: true, isLoading :false})
        return
      }
    }
    if(!id){
      const nodes = this.cache[0]
      this.setState({...this.state, nodes, isRoot: true, isLoading :false})
      return
    }
    if(Object.keys(this.cache).includes(id)){
      const nodes = this.cache[id]
      this.setState({...this.state, nodes, isRoot: false, isLoading :false})
      return
    }
    const nodes = await request('/'+id)
    this.cache[id] = [...nodes]
    this.setState({...this.state, nodes, isRoot: false, isLoading :false})
  }

  const loading = new Loading({target})

  const breadcrumb = new Breadcrumb({target, initialState: {paths: [...this.state.paths]}, onClick: (id, index)=>{
      if(this.state.paths.length-1 === index*1) {
        return
      }
      fetchNodes(id==='0'? '' : id)
      const currentPaths = [...this.state.paths]
      const nextPaths = currentPaths.slice(0,index*1+1)
      this.setState({...this.state, paths: nextPaths})
  }})
  const nodes = new Nodes(
    {
        target, 
        initialState: {
            isRoot:this.state.isRoot,
            nodes: this.state.nodes
        }, 
        onClick: async (node)=>{
          if(node.type ==="DIRECTORY"){
            await fetchNodes(node.id)
            if(!this.state.paths.length || this.state.paths[this.state.paths.length-1].id !== node.id){
                this.setState({...this.state, paths:[...this.state.paths, node]})
            }
          }
          if(node.type ==='FILE'){
            const path = `${IMAGE_END_POINT}${node.filePath[0]==='/'? node.filePath : node.filePath.slice(1)}`
            this.setState({...this.state, imageUrl: path})
          }
        },
        onPrevClick: async () =>{
            const nextPaths = [...this.state.paths]
            nextPaths.pop()
            this.setState({...this.state, paths: nextPaths})
            if(nextPaths.length ===1){
              await fetchNodes()
            }else{
              await fetchNodes(nextPaths[nextPaths.length-1].id)
            }
          }
    })
  const imageViewer = new ImageViewer({target,
  
    onClose: ()=>{
      this.setState({...this.state, imageUrl:null})
    }
  })
  fetchNodes()
}