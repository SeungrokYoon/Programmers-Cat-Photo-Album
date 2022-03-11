export default function Loading({target}) {
  const loading = document.createElement('div')
  target.appendChild(loading)
  loading.className ='Modal'
  this.state =false
  this.setState =(nextState) =>{
    this.state= nextState
    this.render()
  }

  this.render =()=>{
    loading.innerHTML=`
    <div class="content">
      <img src="./assets/nyan-cat.gif">
    </div>
`

    loading.style.display = this.state? 'block' : 'none'
  }
  this.render()
}