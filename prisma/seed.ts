import { PrismaClient } from '@prisma/client';
import { PrismaLibSql } from '@prisma/adapter-libsql';

// 💡 Prisma 7 Pattern: Setup the LibSQL driver adapter for standalone execution
const databaseUrl = process.env.DATABASE_URL || 'file:./prisma/dev.db';

const adapter = new PrismaLibSql({
  url: databaseUrl,
});

const prisma = new PrismaClient({ adapter });

const questions = [
  {
    title: 'Two Sum',
    slug: 'two-sum',
    difficulty: 'Easy',
    problemStatement: `Given an array of integers \`nums\` and an integer \`target\`, return *indices of the two numbers such that they add up to \`target\`*.

You may assume that each input would have ***exactly* one solution**, and you may not use the same element twice.

You can return the answer in any order.`,
    initialCode: `function twoSum(nums, target) {
    // Write your code here
    
};`,
    constraints: `* \`2 <= nums.length <= 10^4\`
* \`-10^9 <= nums[i] <= 10^9\`
* \`-10^9 <= target <= 10^9\`
* Only one valid answer exists.`,
  },
  {
    title: 'Find Missing Number',
    slug: 'find-missing-number',
    difficulty: 'Easy',
    problemStatement: `Given an array \`nums\` containing \`n\` distinct numbers in the range \`[0, n]\`, return *the only number in the range that is missing from the array.*`,
    initialCode: `function missingNumber(nums) {
    // Write your code here
    
};`,
    constraints: `* \`n == nums.length\`
* \`1 <= n <= 10^4\`
* \`0 <= nums[i] <= n\`
* All the numbers of \`nums\` are unique.`,
  },
  {
    title: 'Valid Anagram',
    slug: 'valid-anagram',
    difficulty: 'Easy',
    problemStatement: `Given two strings \`s\` and \`t\`, return \`true\` *if \`t\` is an anagram of \`s\`, and \`false\` otherwise.*

An **Anagram** is a word or phrase formed by rearranging the letters of a different word or phrase, typically using all the original letters exactly once.`,
    initialCode: `function isAnagram(s, t) {
    // Write your code here
    
};`,
    constraints: `* \`1 <= s.length, t.length <= 5 * 10^4\`
* \`s\` and \`t\` consist of lowercase English letters.`,
  },
];

async function main() {
  console.log('🌱 Starting database seeding...');

  // Clean out any existing questions to avoid duplicates
  await prisma.question.deleteMany({});

  for (const q of questions) {
    const question = await prisma.question.create({
      data: q,
    });
    console.log(`✅ Created question: ${question.title}`);
  }

  console.log('🏁 Database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('❌ Seeding error:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
