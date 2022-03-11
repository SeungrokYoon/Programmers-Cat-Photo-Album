export default function BreadCrumb({target, initialState, onClick}){
  const child = document.createElement('nav')
  target.appendChild(child)
  child.className = "Breadcrumb"

  this.state = {paths:[...initialState.paths]} 
  this.setState=(nextState)=>{
      this.state = {...nextState}
      this.render()
  }
  this.render=()=>{
      child.innerHTML =`
          ${this.state.paths.map((node,index)=>`
              <div data-id="${node.id}" data-index="${index}">${node.name}</div>
          `).join('')}
      `
  }
  this.render()

  child.addEventListener('click',(e)=>{
      const targetNodeId = e.target.dataset.id
      const index = e.target.dataset.index
      onClick(targetNodeId, index)
  })
}