import { database } from "@/watermelon";
import Portfolio from "@/watermelon/Portfolio";

const portfolioDB = database.get<Portfolio>("portfolio")

async function getPortfolio(): Promise<Portfolio[]> {
  return await portfolioDB.query().fetch()
}

async function getPortfolioByID(id: string): Promise<Portfolio> {
  return await portfolioDB.find(id)
}


async function createPorfolio(title: string, description: string): Promise<Portfolio> {
  const portfolio = await portfolioDB.create((portfolio: Portfolio) => {
    portfolio.title = title;
    portfolio.description = description;
  })

  return portfolio
}

async function updatePortfolio(id: string, newTitle: string, newDescription: string): Promise<Portfolio> {
  const portfolio =  await portfolioDB.find(id)
  portfolio.updatePortfolio(newTitle, newDescription)

  return portfolio // TODO: double check if portfolio returned is updated
}


async function deletePortfolio(id: string): Promise<void> {
  const portfolio = await portfolioDB.find(id)
  portfolio.markAsDeleted()
}

export {
  getPortfolio,
  getPortfolioByID,
  createPorfolio,
  updatePortfolio,
  deletePortfolio,
}