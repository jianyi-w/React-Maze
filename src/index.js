import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component
{
	constructor(props)
	{
		super(props);
		const complextiy = 30;
		const size = 40;
		const maze = this.generateMaze(size, complextiy);
		this.state=(
		{
			size: size,
			complextiy: complextiy,
			maze: maze,
			visited: [],
			path: [],
			futureSize: size,
			futureComplexity: complextiy,
			abort: 2,
		});
	}

	generateMaze(side, complextiy)
	{
		while(true){
			let size = side*side;
			let arr = [];
			for (let index = 1; index < size-1; index++)
			{
				arr.push(index);
			}
			arr = this.randomlySortArray(arr);
			arr.push(arr[0]);
			arr[0]=size;
			arr.push(size);

			let maze = Array(size).fill(null);
			for (let index = 0; index < size; index++)
			{
				if(arr[index] < size*complextiy/100) continue;
				let v = new Vertex(index);
				if(index % side !== 0 && maze[index-1]!==null)
				{
					v.connect(maze[index-1],1);
					maze[index-1].connect(v,1);
				}
				if(index >= side && maze[index-side]!==null)
				{
					v.connect(maze[index-side],1);
					maze[index-side].connect(v,1);
				}
				maze[index] = v;
			}
			if(maze[0].getConnections().length===0&&maze[size-1].getConnections().length===0)continue;
			let solution = this.aStar(maze[0], maze[size-1], (a, b)=>{
				let key1 = a.getKey(), key2 = b.getKey();
				return (Math.abs((key2%side)-(key1%side))+Math.abs(Math.floor(key2/side)-Math.floor(key1/side)))*2;
			});
			if(solution === null) continue;
			return maze;
		}
	}

	randomlySortArray(arr)
	{
		let currentIndex = arr.length, randomIndex, temp;
		while(currentIndex>0)
		{
			randomIndex = Math.floor(Math.random()*(currentIndex));
			currentIndex--;
			temp = arr[currentIndex];
			arr[currentIndex] = arr[randomIndex];
			arr[randomIndex] = temp;
		}
		return arr;
	}

	aStar(start, end, heuristic)
	{
		let openSet = [];
		let closedSet = [];

		let current;
		start.getConnections().forEach(element => {
			openSet.push({
				vertex:element.vertex,
				distance:element.distance,
				path:[start, element[0]],
			});
		});
		while(openSet.length>0)
		{
			current = openSet[0];
			if(current.vertex === end)
				return {distance:current.distance,path:current.path};
			current.vertex.getConnections().forEach(element => {
				let other = openSet.find((value)=>{return value.vertex===element.vertex;});
				if(other !== undefined)
				{
					if(other.distance>current.distance+element.distance)
					{
						other.distance = current.distance + element.distance;
						other.path = current.path.concat([element.vertex]);
						let index = openSet.findIndex((value)=>{
							return (value.distance+heuristic(value.vertex, end))>=(current.distance+element.distance+heuristic(element.vertex, end));
						});
						index = index===undefined?openSet.length-1:index;
						openSet.splice(openSet.indexOf(other),1);
						openSet.splice(index,0,other);
					}
				}
				else
				{
					other = closedSet.find((value)=>{return value.vertex===element.vertex;});
					if(other !== undefined)
					{
						if(other.distance>current.distance+element.distance)
						{
							other.distance = current.distance + element.distance;
							other.path = current.path.concat([element.vertex]);
							let index = openSet.findIndex((value)=>{
								return (value.distance+heuristic(value.vertex, end))>=(current.distance+element.distance+heuristic(element.vertex, end));
							});
							index = index===undefined?openSet.length-1:index;
							openSet.splice(index,0,other);
							closedSet.splice(closedSet.indexOf(other),1);
						}
					}
					else
					{
						let index = openSet.findIndex((value)=>{
							return (value.distance+heuristic(value.vertex, end))>=(current.distance+element.distance+heuristic(element.vertex, end));
						});
						index = index===undefined?openSet.length-1:index;
						openSet.splice(index,0,{
							vertex: element.vertex,
							distance: current.distance+element.distance,
							path: current.path.concat([element.vertex]),
						});
					}
				}
			});
			closedSet.push(current);
			openSet.splice(openSet.indexOf(current),1);
		}
		return null;
	}

	async aStarVisualised(start, end, heuristic)
	{
		let openSet = [];
		let closedSet = [];

		let current;
		start.getConnections().forEach(element => {
			openSet.push({
				vertex:element.vertex,
				distance:element.distance,
				path:[start, element.vertex],
			});
		});
		while(openSet.length>0)
		{
			current = openSet[0];
			if(current.vertex === end)
			{
				this.visualise(closedSet.map((value)=>{return value.vertex;}), current.path);
				return {distance:current.distance,path:current.path};
			}
			current.vertex.getConnections().forEach(element => {
				let other = openSet.find((value)=>{return value.vertex===element.vertex;});
				if(other !== undefined)
				{
					if(other.distance>current.distance+element.distance)
					{
						other.distance = current.distance + element.distance;
						other.path = current.path.concat([element.vertex]);
						let index = openSet.findIndex((value)=>{
							return (value.distance+heuristic(value.vertex, end))>=(current.distance+element.distance+heuristic(element.vertex, end));
						});
						index = index===undefined?openSet.length-1:index;
						openSet.splice(openSet.indexOf(other),1);
						openSet.splice(index,0,other);
					}
				}
				else
				{
					other = closedSet.find((value)=>{return value.vertex===element.vertex;});
					if(other !== undefined)
					{
						if(other.distance>current.distance+element.distance)
						{
							other.distance = current.distance + element.distance;
							other.path = current.path.concat([element.vertex]);
							let index = openSet.findIndex((value)=>{
								return (value.distance+heuristic(value.vertex, end))>=(current.distance+element.distance+heuristic(element.vertex, end));
							});
							index = index===undefined?openSet.length-1:index;
							openSet.splice(index,0,other);
							closedSet.splice(closedSet.indexOf(other),1);
						}
					}
					else
					{
						let index = openSet.findIndex((value)=>{
							return (value.distance+heuristic(value.vertex, end))>=(current.distance+element.distance+heuristic(element.vertex, end));
						});
						index = index===undefined?openSet.length-1:index;
						openSet.splice(index,0,{
							vertex: element.vertex,
							distance: current.distance+element.distance,
							path: current.path.concat([element.vertex]),
						});
					}
				}
			});
			closedSet.push(current);
			openSet.splice(openSet.indexOf(current),1);

			if(this.visualise(closedSet.map((value)=>{return value.vertex;}), current.path)===1)
			{
				return null;
			}
			await new Promise(resolve=>setTimeout(resolve, 20));
		}
		return null;
	}

	visualise(closedSet, path)
	{
		if(this.state!==undefined) 
		{
			if(this.state.abort===1)
			{
				this.abort();
				return 1;
			}
		}
		this.setState({visited:closedSet, path:path});
		return 0;
	}

	abort()
	{
		this.setState({abort:2});
	}

	heuristic(a, b)
	{
		let key1 = a.getKey(), key2 = b.getKey();
		return (Math.abs((key2%this.state.size)-(key1%this.state.size))+Math.abs(Math.floor(key2/this.state.size)-Math.floor(key1/this.state.size)))*2;
	}

	async restart()
	{
		if(this.state.abort===0)
		{
			this.setState({abort:1});
			do{await new Promise(resolve=>setTimeout(resolve,10));}while(this.state.abort===1);
		}
		this.setState({abort:0});
		const maze = this.state.maze;
		this.aStarVisualised(maze[0],maze[maze.length-1],(a,b)=>{return this.heuristic(a,b)});
	}

	async regenerate()
	{
		if(this.state.abort===0)
		{
			this.setState({abort:1});
			do{await new Promise(resolve=>setTimeout(resolve,10));}while(this.state.abort===1);
		}
		const maze = this.generateMaze(this.state.futureSize, this.state.futureComplexity);
		this.setState({maze:maze,size:this.state.futureSize, complexity:this.state.futureComplexity, path:[],visited:[]});
	}

	render()
	{
		return (
			<div className="game">
				<div className="gamemaze">
					<Maze maze={this.state.maze} mazeSize={this.state.size} visited={this.state.visited} path={this.state.path}></Maze>
				</div>
				<div className="options">
					<div className="buttons">
						<Buttons 
							restart={()=>{this.restart()}}
							regenerate={()=>{this.regenerate()}}
						/>
					</div>
					<div className="sliders">
						<Sliders 
							complexity={this.state.futureComplexity} 
							size ={this.state.futureSize} 
							changeSize={(value)=>{this.setState({futureSize:value});}}
							changeComplexity={(value)=>{this.setState({futureComplexity:value});}}
						/>
					</div>
				</div>
			</div>
		);
	}
}

class Sliders extends React.Component
{
	render()
	{
		return(
			<div>
				<div className="sizeslider, slidercontainer">
					<label>Size:       </label>       
					<input type="range" min="20" max="60" value={this.props.size} className="slider" onInput={(value)=>{this.props.changeSize(value.target.value);}}/>
					<span>{this.props.size}</span>
				</div>
				<div className="complexityslider, slidercontainer">
					<label>Complexity: </label>
					<input type="range" min="20" max="40" value={this.props.complexity} className="slider" onInput={(value)=>{this.props.changeComplexity(value.target.value);}}/>
					<span>{this.props.complexity}</span>
				</div>
			</div>
		);
	}
}

class Buttons extends React.Component
{
	render()
	{
		return (
			<div>
				<div className="buttoncontainer">
					<input type="button" value="Start" className="button" onClick={()=>this.props.restart()}></input>
					<input type="button" value="Regenerate" className="button" onClick={()=>this.props.regenerate()}></input>
				</div>
			</div>
		);
	}
}

class Maze extends React.Component
{
	render()
	{
		const size = this.props.mazeSize;
		const maze = this.props.maze;
		const visited = this.props.visited;
		const path = this.props.path;
		let rows = [];
		for (let i = 0; i < size; i++) 
		{
			let cols = []
			for (let j = 0; j < size; j++) 
			{
				let blocked = maze[i*size+j]===null? 'blocked':'unfilled';
				if(visited.indexOf(maze[i*size+j])>-1) blocked = 'visited';
				if(path.indexOf(maze[i*size+j])>-1) blocked = 'path';
				if(i===0&&j===0) blocked = 'start';
				if(i===size-1&&j===size-1) blocked = 'end';
				let padding = (window.innerHeight/3/size)+"px";
				let borderStyle = "none";
				if(maze[i*size+j]===null)
				{
					padding = "";
					borderStyle = "";
					if(i>0&&maze[(i-1)*size+j]===null)
					{
						padding+=(window.innerHeight/3/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((window.innerHeight/3/size-2)+"px ");
						borderStyle+="solid ";
					}
					if(j<(size-1)&&maze[(i)*size+j+1]===null)
					{
						padding+=(window.innerHeight/3/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((window.innerHeight/3/size-2)+"px ");
						borderStyle+="solid ";
					}
					if(i<(size-1)&&maze[(i+1)*size+j]===null)
					{
						padding+=(window.innerHeight/3/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((window.innerHeight/3/size-2)+"px ");
						borderStyle+="solid ";
					}
					if(j>0&&maze[(i)*size+j-1]===null)
					{
						padding+=(window.innerHeight/3/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((window.innerHeight/3/size-2)+"px ");
						borderStyle+="solid ";
					}
				}
				cols.push(<td className={blocked} key={i*size+j} style={{padding:padding, borderStyle:borderStyle}}></td>);
			}
			rows.push(<tr key={i}>{cols}</tr>);
		}
		return(<table className="maze"><tbody>{rows}</tbody></table>);
	}
}

class Vertex
{
	constructor(key)
	{
		this.key = key;
		this.connections=[];
	}

	connect(v, d)
	{
		this.connections.push({
			vertex: v,
			distance: d
		});
	}

	getKey()
	{
		return this.key;
	}

	getConnections()
	{
		return this.connections;
	}
}

ReactDOM.render(<Game />, document.getElementById("root"));