import { ReactElement } from 'react';
import { Box, SimpleGrid, Icon, Text, Stack, Flex,useColorModeValue } from '@chakra-ui/react';
import { FcAssistant, FcDonate, FcInTransit, FeatureProps } from 'react-icons/fc';
import { IoIosHome } from "react-icons/io" ;
import { IoIosMap } from "react-icons/io" ; 
import { MdChangeCircle } from "react-icons/md";

const Feature = ({ title, text, icon }) => {
  return (
    <Stack>
      <Flex
        w={16}
        h={16}
        align={'center'}
        justify={'center'}
        color={'white'}
        rounded={'full'}
        bg={'gray.100'}
        mb={1}>
        {icon}
      </Flex>
      <Text fontWeight={600}>{title}</Text>
      <Text color={'gray.600'}>{text}</Text>
    </Stack>
  );
};

export default function SimpleThreeColumns() {
  return (
    <Box p={20}>
      <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10}>
        <Feature
          icon={<Icon as={MdChangeCircle} color={'yellow.500'} w={10} h={10} />}
          iconBg={useColorModeValue('yellow.100', 'yellow.900')}
          title={'Selecione o seu Material'}
          text={
            'Selecione aqui o material que deseja realizar a logística reversa.'
          }
        />
        <Feature
          icon={<Icon as={FcDonate} w={10} h={10} />}
          title={'Unlimited Donations'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
        <Feature
          icon={<Icon as={FcInTransit} w={10} h={10} />}
          title={'Instant Delivery'}
          text={
            'Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore...'
          }
        />
      </SimpleGrid>
    </Box>
  );
}