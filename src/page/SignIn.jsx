import { Link } from 'react-router-dom'
import GirlImge from '../images/image-1.png'
import PortImage from '../images/image-2.png'


const SingIn = () => {
	return (
		<>
			<div class="wrapper">
				<div class="inner">
					<img src={GirlImge} alt="" class="image-1" />
					
					<form action="">
					<h1 className=''>Hello, Please Join for Call</h1>
						<button>
							<Link to="/users"><span>Go to UserList</span></Link>

						</button>
					</form>
					<img src={PortImage} alt="" class="image-2" />
				</div>
			</div>
		</>
	)
}

export default SingIn