import {
    Button,
    Flex,
    Heading,
    Image,
    Stack,
    Text,
    useBreakpointValue,
    Link,
  } from '@chakra-ui/react';
  
  export default function SplitScreen() {
    return (
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={6} w={'full'} maxW={'lg'}>
            <Heading fontSize={{ base: '3xl', md: '4xl', lg: '5xl' }}>
              <Text
                as={'span'}
                position={'relative'}
                _after={{
                  content: "''",
                  width: 'full',
                  height: useBreakpointValue({ base: '20%', md: '30%' }),
                  position: 'absolute',
                  bottom: 1,
                  left: 0,
                  bg: 'green.400',
                  zIndex: -1,
                }}>
                O que é
              </Text>
              <br />{' '}
              <Text color={'green.400'} as={'span'}>
                Logística Reversa
              </Text>{' '}
            </Heading>
            <Text fontSize={{ base: 'md', lg: 'lg' }} color={'gray.500'}>
            De acordo com a Política Nacional de Resíduos Sólidos (estabelecida pela lei 12.305 de 2/08/2010), a logística reversa pode ser definida como “instrumento de desenvolvimento econômico e social caracterizado por um conjunto de ações, procedimentos e meios destinados a viabilizar a coleta e a restituição dos resíduos sólidos ao setor empresarial, para reaproveitamento, em seu ciclo ou em outros ciclos produtivos, ou outra destinação final ambientalmente adequada”.

Ou seja, a logística reversa faz com que a indústria que produz o material consiga recolhe-lo e reutiliza-lo dentro do seu ciclo produtivo.
            </Text>
            <Stack direction={{ base: 'column', md: 'row' }} spacing={4}>
              <Button
                rounded={'full'}
                bg={'green.400'}
                color={'white'}
                _hover={{
                  bg: 'green.500',
                }}>
                <Link   href="/cadastro-receptor">
                  Desejo ser um Receptor
                </Link>
              </Button>
              <Button rounded={'full'}>
              <Link   href="/">
                  Desejo Descartar
              </Link>
       </Button>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://cdn.pixabay.com/photo/2012/09/18/19/56/recycle-57136_960_720.jpg'
            }
          />
        </Flex>
      </Stack>
    );
  }