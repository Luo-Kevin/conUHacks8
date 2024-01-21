import React from "react";
import { Heading, Card, CardBody, Text, Divider } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/layout";

const ReportCards = () => {
  return (
    <SimpleGrid columns={2} spacing={5}>
      <Card>
        <CardBody>
          <Heading size="lg" color={"green"}>
            Served Vehicles Report
          </Heading>
          <Divider marginTop={"0.5em"} marginBottom={"0.5em"} />
          <Text fontSize={"lg"} as={"b"}>
            Number of Vehicles Served:{" "}
          </Text>
          <Text>Compact Cars: </Text>
          <Text>Medium Cars: </Text>
          <Text>Full-Size Cars: </Text>
          <Text>Class 1 Trucks: </Text>
          <Text>Class 2 Trucks: </Text>
          <Divider marginTop={"0.5em"} marginBottom={"0.5em"} />
          <Text fontSize={"lg"} as={"b"}>
            Total Revenue:{" "}
          </Text>
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Heading size="lg" color={"red"}>
            Declined Vehicles Report
          </Heading>
          <Divider marginTop={"0.5em"} marginBottom={"0.5em"} />
          <Text fontSize={"lg"} as={"b"}>
            Number of Vehicles Declined:{" "}
          </Text>
          <Text>Compact Cars: </Text>
          <Text>Medium Cars: </Text>
          <Text>Full-Size Cars: </Text>
          <Text>Class 1 Trucks: </Text>
          <Text>Class 2 Trucks: </Text>
          <Divider marginTop={"0.5em"} marginBottom={"0.5em"} />
          <Text fontSize={"lg"} as={"b"}>
            Revenue Lost:{" "}
          </Text>
        </CardBody>
      </Card>
    </SimpleGrid>
  );
};

export default ReportCards;
