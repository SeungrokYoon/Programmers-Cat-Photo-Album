export default function ImageViewer({target, onClose}){
  const imageViewer = document.createElement('div')
  target.appendChild(imageViewer)
  imageViewer.className ="ImageViewer Modal"
  this.state = {
      imageUrl:null
  }
  this.setState= nextState =>{
      this.state= nextState
      this.render()
  }
  this.render =()=>{
      imageViewer.style.display = this.state.imageUrl? 'block' : 'none'
      if(this.state.imageUrl){
          imageViewer.innerHTML = `
              <div class="content">
                  <img src="${this.state.imageUrl}"/>
              </div>
          `
      }
  }
  this.render()

  window.addEventListener('keyup', (e)=>{
    if(e.key === 'Escape'){
      onClose()
    }
  })

  imageViewer.addEventListener('click',e=>{
    if(Array.from(e.target.classList).includes('Modal')){
      onClose()
    }
  })
}