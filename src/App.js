import React from 'react';
import './App.css';

const getCovidData= () => {
  const apiUrl = 'https://covidtracking.com/api/v1/states/current.json';
  return(
    fetch(apiUrl)
      .then((response) => response.json())
  )
}
const TableRow = ({date, state, positive, negative, pending,i}) => {
  return(
    <tr>
      <td>{date}</td>
      <td>{state}</td>
      <td>{positive}</td>
      <td>{negative}</td>
      <td>{pending}</td>
    </tr>
  )
}

class App extends React.Component {
  constructor(props){
    super(props)
    this.state = {data: [], sortColumn: ''}
  }
  componentDidMount() {
    getCovidData().then((data) => this.setState({data: data}))
  }
  isNewSortColumn(sort){
    if(sort !== this.state.sortColumn){
      this.setState({sortColumn: sort})
      return (true)
    }
    else{
      this.setState({sortColumn: ''})
      return (false)
    }
  }
  sortDataBy(column) {
    let {data} = this.state;
    const reverse = this.isNewSortColumn(column)
    data.sort((a, b) =>{
      if(a[column] < b[column]) { return -1; }
      if(a[column] > b[column]) { return 1; }
      return 0;
    })
    if(reverse){
      data.reverse()
    }
    this.setState({data: data})
  }
  
  render(){
    return (
      <div className="App">
        <table className='table table-bordered table-dark'>
          <thead className='thead-light'>
            <tr key={-1}>
              <th><button className='btn btn-dark' onClick={() => this.sortDataBy('date')}>Date</button></th>
              <th><button className='btn btn-dark' onClick={() => this.sortDataBy('state')}>State</button></th>
              <th><button className='btn btn-dark' onClick={() => this.sortDataBy('positive')}>Positive</button></th>
              <th><button className='btn btn-dark' onClick={() => this.sortDataBy('negative')}>Negative</button></th>
              <th><button className='btn btn-dark' onClick={() => this.sortDataBy('pending')}>Pending</button></th>
            </tr>
          </thead>
          <tbody>
            {this.state.data.map((row,i) =>
              <TableRow 
                  date={row.date}
                  state= {row.state}
                  positive={row.positive}
                  negative={row.negative}
                  pending={row.pending}
                  key={i}/>
                  )}
            </tbody>
          </table>
      </div>
    );
  }
}

export default App;
