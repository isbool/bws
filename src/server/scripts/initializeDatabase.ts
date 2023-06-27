import { PrismaClient } from '@prisma/client'
import strategicObjectivesData from './data_json/StrategicObjective.json'
import assessmentCriteriaData from './data_json/AssessmentCriteria.json'
import navBarItemData from './data_json/NavBarItem.json'
import metricData from './data_json/Metric.json'

const prisma = new PrismaClient()


const initializeDatabase = async () => {
    for (const objective of navBarItemData) {
      await prisma.navBarItem.create({
        data: objective,
      })
    }
    for (const objective of strategicObjectivesData) {
        await prisma.strategicObjective.create({
          data: objective,
        })
    }
    for (const objective of assessmentCriteriaData) {
        await prisma.assessmentCriteria.create({
          data: objective,
        })
    }
    for (const objective of metricData) {
        await prisma.metric.create({
          data: objective,
        })
    }
  }
  