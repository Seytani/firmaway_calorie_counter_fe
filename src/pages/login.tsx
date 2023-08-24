import { useEffect, useState } from 'react';
import {
	Button,
	Card,
	CardContent,
	InputAdornment,
	IconButton,
	Link,
	TextField,
	Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useRouter } from 'next/router';
import { setUser } from '@/store/userSlice';
import { useAppDispatch } from '@/store/hooks';
import auth from '../services/auth';

export default function Login() {
	const [mode, setMode] = useState('login');
	const [username, setUserName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();
	const dispatch = useAppDispatch();
	const isDisabled = !email || !password || (mode === 'signup' && !username);

	useEffect(() => {
		const token = localStorage.getItem('token')
		if(token) {
			router.push('calorie_counter')
		}
	})

	function switchMode() {
		if (mode === 'login') {
			setMode('signup');
			return;
		}
		setMode('login');
	}

	async function handleSubmit() {
		let user;
		if (mode === 'login') {
			try {
				user = await auth.login(email, password);
			} catch (error: any) {
				setError(error.message);
				return;
			}
			dispatch(setUser(user));
			router.push('/calorie_counter');
			return;
		}

		// //signup
		try {
			user = await auth.signup(username, email, password);
		} catch (error: any) {
			setError(error.message);
			return;
		}
		dispatch(setUser(user));
		router.push('/calorie_counter');
		return;
	}

	return (
		<div className="h-screen flex justify-center items-center">
			<Card sx={{ width: 400 }}>
				<CardContent>
					<Typography variant="h4" color="primary">
						{mode === 'login' ? 'Login' : 'Sign Up'}
					</Typography>
					{mode !== 'login' && (
						<TextField
							value={username}
							label="Name"
							variant="standard"
							fullWidth
							className="mb-6"
							onChange={(e) => setUserName(e.target.value)}
						/>
					)}
					<TextField
						value={email}
						label="Email"
						variant="standard"
						fullWidth
						onChange={(e) => setEmail(e.target.value)}
						className="mb-6"
					/>
					<TextField
						value={password}
						label="Password"
						variant="standard"
						fullWidth
						onChange={(e) => setPassword(e.target.value)}
						type={showPassword ? 'text' : 'password'}
						className="mb-6"
						InputProps={{
							endAdornment: (
								<InputAdornment position="end">
									<IconButton
										onClick={() =>
											setShowPassword(!showPassword)
										}
									>
										{showPassword ? (
											<VisibilityOff />
										) : (
											<Visibility />
										)}
									</IconButton>
								</InputAdornment>
							),
						}}
					/>
					{error ? (
						<Typography
							variant="body2"
							className="error-message pb-1"
						>
							{error}
						</Typography>
					) : null}
					<Button
						variant="contained"
						color="primary"
						disabled={isDisabled}
						onClick={handleSubmit}
						className="mb-6"
					>
						Submit
					</Button>

					{mode === 'login' ? (
						<Typography variant="caption" display="block">
							Not a member?{' '}
							<Link onClick={switchMode}>Create an account</Link>
						</Typography>
					) : (
						<Typography variant="caption" display="block">
							Already have an account?{' '}
							<Link onClick={switchMode}>Sign in</Link>
						</Typography>
					)}
				</CardContent>
			</Card>
		</div>
	);
}
