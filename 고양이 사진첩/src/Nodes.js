export default function Nodes({target, initialState, onClick, onPrevClick}){
  const child = document.createElement('div')
  target.appendChild(child)
  child.className="Nodes"
  this.state = initialState
  this.setState = nextState =>{
      this.state = nextState
      this.render()
  }

  this.render =()=>{
      const {isRoot, nodes} = this.state
      child.innerHTML=
      `
          ${isRoot?
              '': 
              `
              <div class="Node">
              <img src="./assets/prev.png">
            </div>
              `
          }
          ${nodes.map(node=> 
              `<div class="Node" data-id="${node.id}">
                  <img src="${ node.type==="DIRECTORY"? "./assets/directory.png":"./assets/file.png"}"/>
                  <div>${node.name}</div>
              </div>`
              ).join('')
          }
      `
  }
  this.render()

  child.addEventListener('click', (e)=>{
      const closestNode = e.target.closest('.Node')
      const {id,filePath,parent} = closestNode.dataset
      if(!id){
          onPrevClick()
      }else{
          const node = this.state.nodes.find(node=>node.id===id)
          onClick(node)
      }
  })
}