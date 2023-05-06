import { useEffect, useState } from 'react';
import { create } from 'ipfs-http-client';
import { Buffer } from 'buffer';
import { ethers } from 'ethers';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
  Stack,
  Checkbox,
  Link,
  Image,
  Text,
  HStack,
  Box,
} from '@chakra-ui/react';

const projectId = '2P9H4sRaCxCvN1nbuSLvKvVkezZ';
const projectSecret = 'e8663ec6461a4862350c269ebd0c5de1';
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');
const client = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  apiPath: '/api/v0',
  headers: {
    authorization: auth,
  },
});
function Sell() {
  const [fileUrl, updateFileUrl] = useState('');
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [description, setDescription] = useState('');
  const [houses, setHouses] = useState(0);
  const [account, setAccount] = useState(null);
  const { toggleColorMode } = useColorMode();
  const formBackground = useColorModeValue('gray.100', 'gray.700');
  async function onUpload(e) {
    const file = e.target.files[0];
    try {
      const added = await client.add(file);
      const url = `https://land-bloc-1.infura-ipfs.io/ipfs/${added.path}`;
      updateFileUrl(url);
      console.log(url);
    } catch (error) {
      console.log('Error uploading file: ', error);
    }
  }
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async (e) => {
    let result = await fetch(`http://localhost:8080/houses/`, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST,PATCH,OPTIONS',
      },
    });
    result = await result.json();
    setHouses(result);
    return result;
  };
  const loadAccountData = async () => {
    window.ethereum.on('accountsChanged', async () => {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });
      const account = ethers.utils.getAddress(accounts[0]);
      setAccount(account);
      console.log(account);
    });
  };
  useEffect(() => {
    loadAccountData();
  }, []);
  const handleSubmit = (e) => {
    e.preventDefault();
    let text = `{"name": "${name}", "address": "${address}", "description": "${description}", "image": "${fileUrl}", "id":"${houses.length}"}`;
    console.log(JSON.parse(text));
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <Navigation account={account} setAccount={setAccount} /> */}

      <Flex
        minH={'100vh'}
        align={'center'}
        justify={'center'}
        bg={useColorModeValue('gray.50', 'gray.800')}
      >
        <Stack
          spacing={4}
          w={'full'}
          maxW={'md'}
          bg={useColorModeValue('white', 'gray.700')}
          rounded={'xl'}
          boxShadow={'lg'}
          p={6}
          my={12}
        >
          <Heading lineHeight={1.1} fontSize={{ base: '2xl', md: '3xl' }}>
            Upload your asset
          </Heading>
          <Text
            fontSize={{ base: 'sm', sm: 'md' }}
            color={useColorModeValue('gray.800', 'gray.400')}
          >
            Upload your asset details
          </Text>
          <FormControl id='text' isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type='text'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </FormControl>
          <FormControl id='text' isRequired>
            <FormLabel>Address</FormLabel>
            <Input
              type='text'
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </FormControl>
          <FormControl id='text' isRequired>
            <FormLabel>descripton</FormLabel>
            <Input
              type='text'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </FormControl>
          <FormControl id='file'>
            <FormLabel>Image</FormLabel>
            <Input type='file' onChange={onUpload} />
            {fileUrl && <img src={fileUrl} alt='Asset' width='600px' />}
            <p>{fileUrl}</p>
          </FormControl>
          <Stack spacing={6}>
            <Button
              bg={'blue.400'}
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              type='submit'
            >
              Create asset
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </form>
  );
}
export default Sell;
