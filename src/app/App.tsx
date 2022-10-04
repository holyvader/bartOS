import { FC } from 'react';
import {
	Button,
	FormControl,
	FormHelperText,
	FormLabel,
	Heading,
	Text,
	Input,
	RadioGroup,
	HStack,
	Radio,
	MenuDivider,
	MenuList,
	MenuButton,
	MenuItem,
	Menu,
	MenuGroup,
	useColorMode
} from '@chakra-ui/react';

export const App: FC = () => {
	const { colorMode, toggleColorMode } = useColorMode();

	return (
		<div style={{ padding: 32 }}>
			<Heading mb={4}>Modern online and offline payments for Africa</Heading>
			<Text fontSize="xl">
				Paystack helps businesses in Africa get paid by anyone, anywhere in the
				world
			</Text>
			<Button onClick={toggleColorMode}>
				Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
			</Button>
			<br />
			<br />
			<Button colorScheme="primary" size="lg" mt="24px">
				Create a free account
			</Button>
			<FormControl>
				<FormLabel>Email address</FormLabel>
				<Input type="email" />
				<FormHelperText>We&apos;ll never share your email.</FormHelperText>
			</FormControl>
			<FormControl as="fieldset">
				<FormLabel as="legend">Favorite Naruto Character</FormLabel>
				<RadioGroup defaultValue="Itachi" color={'primary'}>
					<HStack spacing="24px">
						<Radio value="Sasuke">Sasuke</Radio>
						<Radio value="Nagato">Nagato</Radio>
						<Radio value="Itachi">Itachi</Radio>
						<Radio value="Sage of the six Paths">Sage of the six Paths</Radio>
					</HStack>
				</RadioGroup>
				<FormHelperText>Select only if you&apos;re a fan.</FormHelperText>
			</FormControl>
			<Menu>
				<MenuButton as={Button} colorScheme="pink">
					Profile
				</MenuButton>
				<MenuList>
					<MenuGroup title="Profile">
						<MenuItem>My Account</MenuItem>
						<MenuItem>Payments </MenuItem>
					</MenuGroup>
					<MenuDivider />
					<MenuGroup title="Help">
						<MenuItem>Docs</MenuItem>
						<MenuItem>FAQ</MenuItem>
					</MenuGroup>
				</MenuList>
			</Menu>
		</div>
	);
};
