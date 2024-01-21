import React from "react";
import { Heading, Card, CardBody, Text, Divider } from "@chakra-ui/react";
import { SimpleGrid } from "@chakra-ui/layout";

type ReportCardsProps = {
  revenue: number;
  lost_revenue: number;
  count_turnover: number;
  compact_turnover: number;
  medium_turnover: number;
  full_size_turnover: number;
  class_1_turnover: number;
  class_2_turnover: number;
  count_serviced: number;
  compact_serviced: number;
  medium_serviced: number;
  full_size_serviced: number;
  class_1_serviced: number;
  class_2_serviced: number;
}

const ReportCards = (reportCardsProps: ReportCardsProps) => {
  return (
    <div className="report-cards-grid">
      <SimpleGrid columns={2} spacing={5}>
        <Card>
          <CardBody>
            <Heading size="lg" color={"green"}>
              Served Vehicles Report
            </Heading>
            <Divider marginTop={"0.5em"} marginBottom={"0.5em"} />
            <Text fontSize={"lg"} as={"b"}>
              Number of Vehicles Served: {reportCardsProps.count_serviced}
            </Text>
            <Text>Compact Cars: {reportCardsProps.compact_serviced} </Text>
            <Text>Medium Cars: {reportCardsProps.medium_serviced}</Text>
            <Text>Full-Size Cars: {reportCardsProps.full_size_serviced} </Text>
            <Text>Class 1 Trucks: {reportCardsProps.class_1_serviced}</Text>
            <Text>Class 2 Trucks: {reportCardsProps.class_2_serviced}</Text>
            <Divider marginTop={"0.5em"} marginBottom={"0.5em"} />
            <Text fontSize={"lg"} as={"b"}>
              Total Revenue: {reportCardsProps.revenue} $
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
              Number of Vehicles Declined: {reportCardsProps.count_turnover}
            </Text>
            <Text>Compact Cars: {reportCardsProps.compact_turnover} </Text>
            <Text>Medium Cars: {reportCardsProps.medium_turnover}</Text>
            <Text>Full-Size Cars: {reportCardsProps.full_size_turnover} </Text>
            <Text>Class 1 Trucks: {reportCardsProps.class_1_turnover}</Text>
            <Text>Class 2 Trucks: {reportCardsProps.class_2_turnover}</Text>
            <Divider marginTop={"0.5em"} marginBottom={"0.5em"} />
            <Text fontSize={"lg"} as={"b"}>
              Revenue Lost: {reportCardsProps.lost_revenue} $
            </Text>
          </CardBody>
        </Card>
      </SimpleGrid>
    </div>
  );
};

export default ReportCards;
