import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';


class Game extends React.Component
{
	constructor(props)
	{
		super(props);
		const complextiy = 40;
		const size = 50;
		const maze = this.generateMaze(size, complextiy);
		this.state=(
		{
			size: size,
			complextiy: complextiy,
			maze: maze,
			visited: [],
			path: [],
		});
		this.aStarVisualised(maze[0], maze[size*size-1], (a, b)=>{
			let key1 = a.getKey(), key2 = b.getKey();
			return (Math.abs((key2%size)-(key1%size))+Math.abs(Math.floor(key2/size)-Math.floor(key1/size)))*2;
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
			current = openSet.reduce((previousValue, currentValue, currentIndex, Array)=>{
				if(previousValue.distance+heuristic(previousValue.vertex, end)>currentValue.distance+heuristic(currentValue.vertex, end))
					return currentValue;
				return previousValue;
			});
			if(current.vertex === end)
				return {distance:current.distance,path:current.path};
			current.vertex.getConnections().forEach(element => {
				let other = openSet.find((value, index, obj)=>{return value.vertex===element.vertex;});
				if(other !== undefined)
				{
					if(other.distance>current.distance+element.distance)
					{
						other.distance = current.distance + element.distance;
						other.path = current.path.concat([element.vertex]);
					}
				}
				else
				{
					other = closedSet.find((value, index, obj)=>{return value.vertex===element.vertex;});
					if(other !== undefined)
					{
						if(other.distance>current.distance+element.distance)
						{
							other.distance = current.distance + element.distance;
							other.path = current.path.concat([element.vertex]);
							openSet.push(other);
							closedSet.splice(closedSet.indexOf(other),1);
						}
					}
					else
					{
						openSet.push({
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
			current = openSet.reduce((previousValue, currentValue, currentIndex, Array)=>{
				if(previousValue.distance+heuristic(previousValue.vertex, end)>currentValue.distance+heuristic(currentValue.vertex, end))
					return currentValue;
				return previousValue;
			});
			if(current.vertex === end)
			{
				this.visualise(closedSet.map((value)=>{return value.vertex;}), current.path);
				return {distance:current.distance,path:current.path};
			}
			current.vertex.getConnections().forEach(element => {
				let other = openSet.find((value, index, obj)=>{return value.vertex===element.vertex;});
				if(other !== undefined)
				{
					if(other.distance>current.distance+element.distance)
					{
						other.distance = current.distance + element.distance;
						other.path = current.path.concat([element.vertex]);
					}
				}
				else
				{
					other = closedSet.find((value, index, obj)=>{return value.vertex===element.vertex;});
					if(other !== undefined)
					{
						if(other.distance>current.distance+element.distance)
						{
							other.distance = current.distance + element.distance;
							other.path = current.path.concat([element.vertex]);
							openSet.push(other);
							closedSet.splice(closedSet.indexOf(other),1);
						}
					}
					else
					{
						openSet.push({
							vertex: element.vertex,
							distance: current.distance+element.distance,
							path: current.path.concat([element.vertex]),
						});
					}
				}
			});
			closedSet.push(current);
			openSet.splice(openSet.indexOf(current),1);

			this.visualise(closedSet.map((value)=>{return value.vertex;}), current.path);
			await new Promise(resolve=>setTimeout(resolve, 10));
		}
		return null;
	}

	visualise(closedSet, path)
	{
		this.setState({visited:closedSet, path:path});
	}

	// heuristic(a, b)
	// {
	// 	let key1 = a.getKey(), key2 = b.getKey();
	// 	return (Math.abs((key2%side)-(key2%side))+Math.abs(Math.floor(key2/side)-Math.floor(key1/side)))*2;
	// }

	render()
	{
		return (
			<div className="game">
				<div className="gamemaze">
					<Maze maze={this.state.maze} mazeSize={this.state.size} visited={this.state.visited} path={this.state.path}></Maze>
				</div>
				<div className="options">
					<div className="buttons">

					</div>
					<div className="sliders">

					</div>
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
				let padding = (300/size)+"px";
				let borderStyle = "none";
				if(maze[i*size+j]===null)
				{
					padding = "";
					borderStyle = "";
					if(i>0&&maze[(i-1)*size+j]===null)
					{
						padding+=(300/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((300/size-3)+"px ");
						borderStyle+="solid ";
					}
					if(j<(size-1)&&maze[(i)*size+j+1]===null)
					{
						padding+=(300/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((300/size-3)+"px ");
						borderStyle+="solid ";
					}
					if(i<(size-1)&&maze[(i+1)*size+j]===null)
					{
						padding+=(300/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((300/size-3)+"px ");
						borderStyle+="solid ";
					}
					if(j>0&&maze[(i)*size+j-1]===null)
					{
						padding+=(300/size+"px ");
						borderStyle+="none ";
					}
					else
					{
						padding+=((300/size-3)+"px ");
						borderStyle+="solid ";
					}
				}
				cols.push(<td className={blocked} key={i*size+j} style={{padding:padding, borderStyle:borderStyle}}></td>);
			}
			rows.push(<tr>{cols}</tr>);
		}
		return(<table className="maze">{rows}</table>);
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